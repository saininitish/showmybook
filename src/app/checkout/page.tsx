"use client";

import Navbar from "@/components/Navbar";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { sendBookingConfirmation } from "@/lib/emailjs";
import { useAuth } from "@/contexts/AuthContext";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, profile } = useAuth();
  const seats = searchParams.get("seats")?.split(",") || [];
  const total = searchParams.get("total") || "0";
  const movieId = searchParams.get("movie");
  const eventId = searchParams.get("event");
  const [isProcessing, setIsProcessing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const isSignedIn = !!user;
  const displayName = profile ? [profile.first_name, profile.last_name].filter(Boolean).join(" ") : "";
  const userEmail = user?.email ?? "";

  const handlePayment = async () => {
    const name = isSignedIn ? (displayName || user?.email?.split("@")[0] || "Customer") : [firstName.trim(), lastName.trim()].filter(Boolean).join(" ") || "Customer";
    const customerEmail = isSignedIn ? userEmail : (email.trim() || "guest@example.com");
    const ref = "BMS" + Math.floor(Math.random() * 1000000);
    const showDetails = movieId ? "Movie booking" : eventId ? "Event booking" : "Your booking";
    setIsProcessing(true);
    try {
      await sendBookingConfirmation({
        customer_name: name,
        customer_email: customerEmail,
        booking_ref: ref,
        seats: seats.join(", "),
        total: `₹${parseInt(total) + seats.length * 30}`,
        show_details: showDetails,
      });
    } catch (_) {
      // Email is best-effort; still confirm booking
    }
    // Simulate payment delay then redirect
    setTimeout(() => {
      const params = new URLSearchParams({ ref, seats: seats.join(",") });
      params.set("email", customerEmail);
      router.push(`/confirmation?${params.toString()}`);
    }, 1500);
  };

  const convenienceFee = seats.length * 30;
  const grandTotal = parseInt(total) + convenienceFee;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 md:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Form & Payment */}
          <div className="md:col-span-2 space-y-6">
            <section className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
                Contact Details
              </h2>
              {isSignedIn ? (
                <div className="grid grid-cols-2 gap-4 text-white">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-sm text-text-muted mb-1">First Name</p>
                    <p className="font-medium">{profile?.first_name || "—"}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-sm text-text-muted mb-1">Last Name</p>
                    <p className="font-medium">{profile?.last_name || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-text-muted mb-1">Email Address</p>
                    <p className="font-medium">{userEmail || "—"}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm text-text-muted mb-1.5">First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm text-text-muted mb-1.5">Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-text-muted mb-1.5">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors" required />
                  </div>
                </div>
              )}
            </section>

            <section className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-primary bg-primary/5 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" defaultChecked className="accent-primary w-4 h-4" />
                    <span className="font-medium">Credit / Debit Card</span>
                  </div>
                  <CreditCard className="text-primary w-5 h-5" />
                </label>
                <label className="flex items-center justify-between p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="accent-primary w-4 h-4" />
                    <span className="font-medium">UPI / Netbanking</span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div>
            <div className="glass-panel p-6 rounded-2xl sticky top-28">
              <h2 className="text-lg font-bold mb-4 border-b border-white/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-text-muted">Tickets ({seats.length})</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Seats</span>
                  <span className="font-medium text-right max-w-[150px]">{seats.join(", ")}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Convenience Fee</span>
                  <span>₹{convenienceFee}</span>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4 mb-6 flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-display font-bold text-2xl text-primary">₹{grandTotal}</span>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing || (!isSignedIn && !email.trim())}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover-lift"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Pay ₹{grandTotal}
                  </>
                )}
              </button>
              <p className="text-xs text-center text-text-muted mt-4">
                By proceeding, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
