import Navbar from "@/components/Navbar";
import EventSeatMapClient from "./EventSeatMapClient";

export default function EventSeatsPage({ 
  params, 
  searchParams 
}: { 
  params: { id: string },
  searchParams: { tier?: string }
}) {
  const tierMap: Record<string, { name: string, price: number }> = {
    "t1": { name: "Early Bird General", price: 4500 },
    "t2": { name: "Phase 1 General", price: 5500 },
    "t3": { name: "VIP Lounge", price: 12500 },
    "t4": { name: "VVIP Meet & Greet", price: 35000 },
  };

  const selectedTier = tierMap[searchParams.tier || "t2"] || tierMap["t2"];
  const eventName = params.id === "e1" ? "Coldplay: Music Of The Spheres" : "Standup Comedy Special";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-32 max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col">
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Select Seats</h1>
          <p className="text-text-muted mt-1">
            {eventName} • {selectedTier.name}
          </p>
        </div>

        <div className="flex-1 glass-panel rounded-3xl p-6 md:p-12 flex flex-col items-center overflow-hidden">
          <EventSeatMapClient eventId={params.id} tierPrice={selectedTier.price} />
        </div>
      </main>
    </div>
  );
}
