import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const SUPABASE_CONFIGURED = Boolean(url && anonKey);

export type Profile = {
  id: string;
  email: string | null;
  stripe_customer_id: string | null;
  is_pro: boolean;
};
