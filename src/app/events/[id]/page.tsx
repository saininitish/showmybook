import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Share2, Heart, Clock } from "lucide-react";

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for the event
  const isColdplay = params.id === "e1";
  const event = {
    title: isColdplay ? "Coldplay: Music Of The Spheres" : "Standup Comedy Special",
    category: isColdplay ? "Concert" : "Comedy",
    date: isColdplay ? "Oct 15, 2026" : "Aug 10, 2026",
    time: "07:30 PM Onwards",
    venue: isColdplay ? "National Stadium, Mumbai" : "Laugh Club, Delhi",
    poster: isColdplay ? "https://images.unsplash.com/photo-1540039155732-6761b54f6cce?q=80&w=1000&auto=format&fit=crop" : "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=1000&auto=format&fit=crop",
    about: isColdplay 
      ? "Following the spectacular success of their global tour, Coldplay brings the Music Of The Spheres World Tour to India. Experience a magical evening filled with their greatest hits, mind-bending visuals, and an atmosphere like never before. The concert will feature sustainable initiatives to reduce carbon footprint."
      : "Get ready for a night of non-stop laughter with the country's top comedians. Raw, unfiltered, and absolutely hilarious.",
    duration: isColdplay ? "3hrs" : "1.5hrs",
  };

  const pricingTiers = [
    { id: "t1", name: "Early Bird General", price: 4500, desc: "Standing area, access to food stalls", status: "sold_out" },
    { id: "t2", name: "Phase 1 General", price: 5500, desc: "Standing area, access to food stalls", status: "available" },
    { id: "t3", name: "VIP Lounge", price: 12500, desc: "Elevated viewing, dedicated bar, lounge seating", status: "available" },
    { id: "t4", name: "VVIP Meet & Greet", price: 35000, desc: "Front row access, artist meet, merch box", status: "fast_filling" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      {/* Event Hero */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image src={event.poster} alt={event.title} fill priority className="object-cover object-center opacity-40 blur-sm" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 h-full flex flex-col justify-end pb-8">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="w-[80vw] md:w-[60vw] max-w-[500px] aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative shrink-0">
               <Image src={event.poster} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 80vw, 500px" />
            </div>
            
            <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="inline-block bg-accent/90 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-md mb-4 uppercase tracking-wider">
                  {event.category}
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-text-muted font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-white/70" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-white/70" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-white/70" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 shrink-0">
                <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors group">
                  <Heart className="w-5 h-5 group-hover:text-accent group-hover:fill-accent transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content & Tickets */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Col: About */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">About the Event</h2>
            <p className="text-text-muted leading-relaxed text-lg">
              {event.about}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-b border-white/10 py-8">
            <div>
              <p className="text-sm text-text-muted mb-1">Duration</p>
              <p className="font-semibold text-lg">{event.duration}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Age Limit</p>
              <p className="font-semibold text-lg">16+ Years</p>
            </div>
          </div>
        </div>

        {/* Right Col: Booking/Tiers */}
        <div className="relative">
          <div className="sticky top-28 space-y-6">
            <div className="glass-panel rounded-3xl p-6 border-t border-accent/30">
              <h2 className="font-display text-xl font-bold mb-6">Select Category</h2>
              
              <div className="space-y-4">
                {pricingTiers.map(tier => (
                  <div key={tier.id} className={`p-4 rounded-2xl border ${tier.status === 'sold_out' ? 'border-white/5 opacity-50 bg-white/5' : 'border-white/10 bg-black/40 hover:border-accent/50'} transition-colors`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{tier.name}</h3>
                      <span className="font-bold text-lg">₹{tier.price}</span>
                    </div>
                    <p className="text-sm text-text-muted mb-4">{tier.desc}</p>
                    
                    {tier.status === 'sold_out' ? (
                      <button disabled className="w-full py-2 rounded-lg bg-white/5 text-white/30 font-semibold cursor-not-allowed text-sm">
                        Sold Out
                      </button>
                    ) : (
                      <Link href={`/login?redirect=/events/${params.id}/seats?tier=${tier.id}`} className="block w-full py-2 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white font-semibold text-sm text-center transition-all">
                        Book Now
                      </Link>
                    )}
                    
                    {tier.status === 'fast_filling' && (
                      <p className="text-xs text-accent mt-2 font-medium flex items-center justify-center gap-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Fast Filling
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
