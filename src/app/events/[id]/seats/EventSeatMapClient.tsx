"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EventSeatMapClientProps {
  eventId: string;
  tierPrice: number;
}

export default function EventSeatMapClient({ eventId, tierPrice }: EventSeatMapClientProps) {
  const router = useRouter();
  const [ticketCount, setTicketCount] = useState(1);

  const increment = () => {
    if (ticketCount < 10) setTicketCount(prev => prev + 1);
  };

  const decrement = () => {
    if (ticketCount > 1) setTicketCount(prev => prev - 1);
  };

  const totalPrice = ticketCount * tierPrice;

  const proceedToCheckout = () => {
    // Generate dummy seat IDs like GA-1, GA-2 based on count since this is an event/concert general admission usually
    const seats = Array.from({ length: ticketCount }).map((_, i) => `GA-${i+1}`).join(',');
    router.push(`/checkout?event=${eventId}&seats=${seats}&total=${totalPrice}`);
  };

  return (
    <div className="w-full flex flex-col items-center max-w-2xl mx-auto py-12">
      {/* Event Stage Graphic */}
      <div className="w-full h-32 rounded-t-full bg-gradient-to-b from-accent/40 to-transparent border-t-4 border-accent flex items-start justify-center pt-6 mb-16 relative">
        <div className="absolute inset-0 bg-[url('/placeholder-image.svg')] bg-cover bg-center opacity-10 rounded-t-full mask-image-gradient" />
        <span className="font-display font-bold tracking-[0.3em] uppercase text-white/80 z-10">Main Stage</span>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-2">How many tickets?</h2>
        <p className="text-text-muted">You can select up to 10 tickets per transaction.</p>
      </div>

      {/* Counter Control */}
      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={decrement}
          disabled={ticketCount <= 1}
          className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-2xl hover:bg-white/10 hover:border-white/40 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          -
        </button>
        
        <div className="w-24 text-center font-display font-bold text-6xl text-white">
          {ticketCount}
        </div>
        
        <button 
          onClick={increment}
          disabled={ticketCount >= 10}
          className="w-14 h-14 rounded-full border-2 border-accent/50 text-accent flex items-center justify-center text-2xl hover:bg-accent/10 hover:border-accent disabled:opacity-30 transition-all"
        >
          +
        </button>
      </div>

      <div className="glass-panel p-6 rounded-2xl w-full max-w-sm flex justify-between items-center">
        <span className="text-text-muted">Price per ticket</span>
        <span className="font-semibold text-lg">₹{tierPrice}</span>
      </div>

      {/* Bottom Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-white/10 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">{ticketCount} Ticket{ticketCount > 1 ? 's' : ''}</p>
            <p className="font-display font-bold text-xl">₹{totalPrice}</p>
          </div>
          <button 
            onClick={proceedToCheckout}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] hover-lift"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
