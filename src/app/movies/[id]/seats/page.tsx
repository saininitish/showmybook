import Navbar from "@/components/Navbar";
import SeatMapClient from "./SeatMapClient";

export default function SeatsPage({ 
  params, 
  searchParams 
}: { 
  params: { id: string },
  searchParams: { hall?: string, time?: string }
}) {
  const hallName = searchParams.hall || "PVR: Nexus Mall (IMAX)";
  const time = searchParams.time || "08:30 PM";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-32 max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col">
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">Select Seats</h1>
          <p className="text-text-muted mt-1">
            {hallName} • Today, {time}
          </p>
        </div>

        <div className="flex-1 glass-panel rounded-3xl p-6 md:p-12 flex flex-col items-center overflow-hidden">
          <SeatMapClient movieId={params.id} />
        </div>
      </main>
    </div>
  );
}
