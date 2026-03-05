"use client";

import Navbar from "@/components/Navbar";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { user, profile, loading: authLoading, refreshUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already signed in, redirect (to home or complete-profile)
  useEffect(() => {
    if (authLoading || !user) return;
    if (profile?.first_name || profile?.last_name) {
      router.replace(redirectUrl);
      return;
    }
    router.replace("/complete-profile?redirect=" + encodeURIComponent(redirectUrl));
  }, [user, profile, authLoading, redirectUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
    try {
      if (isLogin) {
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = (json.error || "Sign in failed").toLowerCase();
          if (res.status === 500) {
            setMessage({ type: "error", text: "Server config error. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart the dev server." });
          } else if (msg.includes("invalid") || msg.includes("credentials")) {
            setMessage({ type: "error", text: "No account found with this email. Please sign up first." });
          } else if (msg.includes("email not confirmed") || msg.includes("confirm your email")) {
            setMessage({ type: "error", text: "Please confirm your email first. Check your inbox for the confirmation link." });
          } else {
            setMessage({ type: "error", text: json.error || "Sign in failed." });
          }
          setIsLoading(false);
          return;
        }
        if (json.session) {
          await supabase.auth.setSession(json.session);
          await refreshUser();
        }
        if (json.user) {
          const meta = (json.user.user_metadata || {}) as Record<string, string>;
          if (meta.first_name || meta.last_name) {
            router.push(redirectUrl);
          } else {
            router.push("/complete-profile?redirect=" + encodeURIComponent(redirectUrl));
          }
        }
        setIsLoading(false);
        return;
      }

      // Sign up via API (avoids browser → Supabase SSL/blocking)
      const emailRedirectTo = typeof window !== "undefined" ? `${window.location.origin}/login?redirect=${encodeURIComponent(redirectUrl)}` : undefined;
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, emailRedirectTo }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 500) {
          setMessage({ type: "error", text: "Server config error. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart the dev server." });
        } else {
          setMessage({ type: "error", text: json.error || "Sign up failed." });
        }
        setIsLoading(false);
        return;
      }
      if (json.session) {
        await supabase.auth.setSession(json.session);
        await refreshUser();
        router.push("/complete-profile?redirect=" + encodeURIComponent(redirectUrl));
      } else {
        setMessage({
          type: "success",
          text: "Account created! Please check your email and click the confirmation link. Then sign in below.",
        });
      }
      setIsLoading(false);
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      const isNetworkError = /failed to fetch|network error|load failed|fetch failed/i.test(raw);
      setMessage({
        type: "error",
        text: isNetworkError
          ? "Cannot reach the app server. Check that the dev server is running and try again."
          : "Something went wrong. Please try again.",
      });
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-primary animate-pulse">Loading...</div>
        </main>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary animate-pulse">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md">
          <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden border-t border-primary/30 shadow-[0_0_40px_rgba(124,58,237,0.1)]">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <h1 className="font-display text-3xl font-bold text-white mb-2">
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-text-muted mb-8">
                {isLogin
                  ? "Sign in to continue your booking process."
                  : "Join ReelBook to get exclusive pre-sales and offers."}
              </p>

              {message && (
                <div
                  className={`mb-6 p-4 rounded-xl text-sm ${
                    message.type === "error"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-green-500/10 text-green-400 border border-green-500/20"
                  }`}
                >
                  {message.text}
                  {message.type === "error" && isLogin && (
                    <button
                      type="button"
                      onClick={() => { setIsLogin(false); setMessage(null); }}
                      className="block mt-2 font-medium underline hover:no-underline"
                    >
                      Sign up instead
                    </button>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-text-muted mb-1.5">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-text-muted" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-text-muted mb-1.5 flex justify-between">
                    Password
                    {isLogin && <button type="button" className="text-primary hover:text-primary/80 transition-colors">Forgot?</button>}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-text-muted" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover-lift mt-6"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Authenticating...</span>
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Sign Up"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-text-muted">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => { setIsLogin(!isLogin); setMessage(null); }}
                    className="text-white font-medium hover:text-primary transition-colors"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
