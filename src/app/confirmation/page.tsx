"use client";

import Navbar from "@/components/Navbar";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Download, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "BMS928134";
  const seats = searchParams.get("seats") || "G4, G5";
  const email = searchParams.get("email") || "your email";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          <div className="glass-panel p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <h1 className="font-display text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
              <p className="text-text-muted mb-8">We have sent your e-ticket to {email}.</p>
              
              <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-left mb-8">
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <p className="text-xs text-text-muted mb-1 uppercase tracking-wider">Booking ID</p>
                    <p className="font-semibold">{ref}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1 uppercase tracking-wider">Seats</p>
                    <p className="font-semibold">{seats}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-text-muted mb-1 uppercase tracking-wider">Show Details</p>
                    <p className="font-semibold">Dune: Part Two (IMAX)</p>
                    <p className="text-sm text-text-muted mt-0.5">Today, 08:30 PM • PVR: Nexus Mall</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <button 
                  onClick={() => {
                    alert("Simulating PDF Download for " + ref);
                  }}
                  className="w-full sm:w-1/2 glass-panel hover:bg-white/10 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download PDF Ticket
                </button>
                <Link href="/" className="w-full sm:w-1/2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
