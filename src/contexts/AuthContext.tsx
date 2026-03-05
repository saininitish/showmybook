"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type Profile = {
  first_name: string;
  last_name: string;
};

type AuthState = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = useCallback((u: User | null): Profile | null => {
    if (!u?.user_metadata) return null;
    const m = u.user_metadata as Record<string, string>;
    const first = m?.first_name ?? "";
    const last = m?.last_name ?? "";
    if (!first && !last) return null;
    return { first_name: first, last_name: last };
  }, []);

  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshUser = useCallback(async () => {
    const { data: { user: u } } = await supabase.auth.getUser();
    setUser(u);
    setProfile(getProfile(u));
  }, [getProfile]);

  useEffect(() => {
    refreshUser()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setProfile(getProfile(session?.user ?? null));
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [getProfile, refreshUser]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
