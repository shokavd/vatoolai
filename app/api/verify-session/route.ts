import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed." }, { status: 402 });
    }

    return NextResponse.json({
      customerId: session.customer,
      email: session.customer_details?.email,
    });
  } catch (error) {
    console.error("Verify session error:", error);
    return NextResponse.json(
      { error: "Could not verify session." },
      { status: 500 }
    );
  }
}
