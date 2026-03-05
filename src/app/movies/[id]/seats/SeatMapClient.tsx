"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Seat {
  id: string;
  label?: string;
  type?: "standard" | "accessible" | "companion" | "premium";
  price: number;
}

interface Row {
  rowLabel: string;
  seats: Seat[];
}

interface SeatLayout {
  venueId: string;
  rows: Row[];
}

const staticLayout: SeatLayout = {
  venueId: "hall-1",
  rows: [
    { rowLabel: "H", seats: Array.from({ length: 12 }).map((_, i) => ({ id: `H${i+1}`, label: `${i+1}`, price: 400, type: "premium" })) },
    { rowLabel: "G", seats: Array.from({ length: 14 }).map((_, i) => ({ id: `G${i+1}`, label: `${i+1}`, price: 400, type: "premium" })) },
    { rowLabel: "F", seats: Array.from({ length: 14 }).map((_, i) => ({ id: `F${i+1}`, label: `${i+1}`, price: 250, type: "standard" })) },
    { rowLabel: "E", seats: Array.from({ length: 16 }).map((_, i) => ({ id: `E${i+1}`, label: `${i+1}`, price: 250, type: "standard" })) },
    { rowLabel: "D", seats: Array.from({ length: 16 }).map((_, i) => ({ id: `D${i+1}`, label: `${i+1}`, price: 250, type: "standard" })) },
    { rowLabel: "C", seats: Array.from({ length: 14 }).map((_, i) => ({ id: `C${i+1}`, label: `${i+1}`, price: 250, type: "standard" })) },
    { rowLabel: "B", seats: Array.from({ length: 14 }).map((_, i) => ({ id: `B${i+1}`, label: `${i+1}`, price: 250, type: i === 0 || i === 13 ? "accessible" : "standard" })) },
    { rowLabel: "A", seats: Array.from({ length: 12 }).map((_, i) => ({ id: `A${i+1}`, label: `${i+1}`, price: 150, type: "standard" })) },
  ],
};

const DUMMY_SOLD = ["G4", "G5", "F7", "F8", "F9", "E12", "C3", "C4"];

export default function SeatMapClient({ movieId }: { movieId: string }) {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const toggleSeat = (seat: Seat) => {
    if (DUMMY_SOLD.includes(seat.id)) return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) return prev.filter(s => s.id !== seat.id);
      if (prev.length >= 10) return prev; // max 10 seats
      return [...prev, seat];
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const proceedToCheckout = () => {
    if (selectedSeats.length === 0) return;
    // In a real app, save to state/context here. We'll pass via URL for demo.
    router.push(`/checkout?movie=${movieId}&seats=${selectedSeats.map(s => s.id).join(',')}&total=${totalPrice}`);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Screen SVG */}
      <div className="w-full max-w-2xl mb-12 flex flex-col items-center opacity-70">
        <svg viewBox="0 0 800 100" className="w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <path d="M 0 100 Q 400 0 800 100" fill="none" stroke="url(#screenGrad)" strokeWidth="6" />
          <defs>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-sm font-medium tracking-widest uppercase text-white/50 mt-2">Screen this way</span>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto w-full pb-8 hide-scrollbar flex justify-center">
        <div className="flex flex-col gap-3 min-w-max">
          {staticLayout.rows.map(row => (
            <div key={row.rowLabel} className="flex items-center gap-4">
              <span className="w-6 text-right text-sm font-semibold text-text-muted">{row.rowLabel}</span>
              <div className="flex gap-2">
                {row.seats.map(seat => {
                  const isSold = DUMMY_SOLD.includes(seat.id);
                  const isSelected = selectedSeats.some(s => s.id === seat.id);
                  const isAccessible = seat.type === "accessible";

                  return (
                    <button
                      key={seat.id}
                      onClick={() => toggleSeat(seat)}
                      disabled={isSold}
                      className={cn(
                        "w-8 h-8 md:w-9 md:h-9 rounded-t-lg rounded-b-sm text-[10px] md:text-xs font-medium transition-all duration-200 flex items-center justify-center border",
                        isSold 
                          ? "bg-white/5 border-white/5 text-white/20 cursor-not-allowed" 
                          : isSelected 
                            ? "bg-primary border-primary text-white shadow-[0_0_12px_rgba(124,58,237,0.6)] transform -translate-y-1" 
                            : isAccessible
                              ? "bg-blue-500/20 border-blue-500/50 text-blue-200 hover:bg-blue-500/40"
                              : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:border-white/40"
                      )}
                      aria-label={`Seat ${seat.id}, ${isSold ? 'Sold' : isSelected ? 'Selected' : 'Available'}`}
                    >
                      {isAccessible ? "♿" : seat.label}
                    </button>
                  );
                })}
              </div>
              <span className="w-6 text-left text-sm font-semibold text-text-muted">{row.rowLabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-white/10 w-full max-w-2xl">
        <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-white/10 border border-white/20" /><span className="text-sm text-text-muted">Available</span></div>
        <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-primary border border-primary shadow-[0_0_8px_rgba(124,58,237,0.5)]" /><span className="text-sm text-text-muted">Selected</span></div>
        <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-white/5 border border-white/5" /><span className="text-sm text-text-muted">Sold</span></div>
        <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-[10px]">♿</div><span className="text-sm text-text-muted">Accessible</span></div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-white/10 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            {selectedSeats.length > 0 ? (
              <>
                <p className="text-sm text-text-muted">{selectedSeats.length} Ticket{selectedSeats.length > 1 ? 's' : ''}</p>
                <p className="font-display font-bold text-xl">₹{totalPrice}</p>
              </>
            ) : (
              <p className="text-text-muted">No seats selected</p>
            )}
          </div>
          <button 
            onClick={proceedToCheckout}
            disabled={selectedSeats.length === 0}
            className={cn(
              "px-8 py-3 rounded-full font-bold transition-all",
              selectedSeats.length > 0 
                ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover-lift" 
                : "bg-white/10 text-white/30 cursor-not-allowed"
            )}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
