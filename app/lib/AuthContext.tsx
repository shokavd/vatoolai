"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase, SUPABASE_CONFIGURED } from "./supabase";

type User = {
  id: string;
  email: string | null;
};

type AuthState = {
  user: User | null;
  isProUser: boolean;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProStatus: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  isProUser: false,
  loading: true,
  signInWithEmail: async () => ({}),
  signOut: async () => {},
  refreshProStatus: async () => {},
});

function getLocalPro() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("clarity_ai_pro") === "true";
}

async function fetchIsPro(userId: string): Promise<boolean> {
  if (!supabase) return false;
  const { data } = await supabase
    .from("profiles")
    .select("is_pro")
    .eq("id", userId)
    .single();
  return data?.is_pro ?? false;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(true);

  async function applySession(sessionUser: { id: string; email?: string | null } | null) {
    if (!sessionUser) {
      setUser(null);
      setIsProUser(getLocalPro());
      return;
    }
    setUser({ id: sessionUser.id, email: sessionUser.email ?? null });
    const isPro = await fetchIsPro(sessionUser.id);
    setIsProUser(isPro);
    localStorage.setItem("clarity_ai_pro", isPro ? "true" : "false");
  }

  useEffect(() => {
    if (!SUPABASE_CONFIGURED || !supabase) {
      setIsProUser(getLocalPro());
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data }) => {
      await applySession(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await applySession(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshProStatus() {
    if (!user || !supabase) {
      setIsProUser(getLocalPro());
      return;
    }
    const isPro = await fetchIsPro(user.id);
    setIsProUser(isPro);
    localStorage.setItem("clarity_ai_pro", isPro ? "true" : "false");
  }

  async function signInWithEmail(email: string): Promise<{ error?: string }> {
    if (!supabase) return { error: "Auth not configured." };
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    return error ? { error: error.message } : {};
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setIsProUser(getLocalPro());
  }

  return (
    <AuthContext.Provider value={{ user, isProUser, loading, signInWithEmail, signOut, refreshProStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
