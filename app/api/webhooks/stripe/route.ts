import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    const customerId = typeof session.customer === "string" ? session.customer : null;
    const email = session.customer_details?.email ?? null;

    if (supabase) {
      if (userId) {
        // User was signed in — link directly by Supabase user ID
        await supabase.from("profiles").upsert({
          id: userId,
          stripe_customer_id: customerId,
          is_pro: true,
          email,
        });
      } else if (email) {
        // User paid without signing in — try to find them by email
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", email)
          .single();

        if (profile) {
          await supabase.from("profiles")
            .update({ stripe_customer_id: customerId, is_pro: true })
            .eq("id", profile.id);
        } else {
          // No profile exists — create auth user so they can sign in later via magic link
          const { data: authData, error: createError } = await supabase.auth.admin.createUser({
            email,
            email_confirm: true,
          });
          if (!createError && authData.user) {
            await supabase.from("profiles").upsert({
              id: authData.user.id,
              email,
              stripe_customer_id: customerId,
              is_pro: true,
            });
          } else {
            console.error("Could not create auth user for paid customer:", email, createError?.message);
          }
        }
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = typeof subscription.customer === "string" ? subscription.customer : null;

    if (customerId && supabase) {
      await supabase
        .from("profiles")
        .update({ is_pro: false })
        .eq("stripe_customer_id", customerId);
    }
  }

  return NextResponse.json({ received: true });
}
