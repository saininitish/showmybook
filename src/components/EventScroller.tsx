"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin } from "lucide-react";
import { useRef } from "react";

interface Event {
  id: string;
  title: string;
  poster: string;
  category: string;
  date: string;
  venue: string;
}

const DUMMY_EVENTS: Event[] = [
  { id: "e1", title: "Coldplay: Music Of The Spheres", category: "Concert", date: "Oct 15, 2026", venue: "National Stadium", poster: "https://images.unsplash.com/photo-1540039155732-6761b54f6cce?q=80&w=1000&auto=format&fit=crop" },
  { id: "e2", title: "Standup Comedy Special", category: "Comedy", date: "Aug 10, 2026", venue: "Laugh Club", poster: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=1000&auto=format&fit=crop" },
  { id: "e3", title: "Tech Innovators Conference", category: "Conference", date: "Sep 05, 2026", venue: "Expo Center", poster: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop" },
  { id: "e4", title: "Symphony Orchestra", category: "Classical", date: "Nov 20, 2026", venue: "Grand Theater", poster: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000&auto=format&fit=crop" },
];

export default function EventScroller({ title }: { title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 relative w-full max-w-7xl mx-auto px-4 md:px-8 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          {title}
          <div className="h-0.5 w-12 bg-accent rounded-full" />
        </h2>
        <Link href="/events" className="text-text-muted hover:text-white transition-colors flex items-center text-sm font-medium">
          See All <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="relative group/nav">
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover/nav:opacity-100 transition-all hover:bg-white/10 hidden md:flex"
        >
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover/nav:opacity-100 transition-all hover:bg-white/10 hidden md:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 pt-2 snap-x snap-mandatory"
        >
          {DUMMY_EVENTS.map((event) => (
            <Link 
              href={`/events/${event.id}`}
              key={event.id} 
              className="min-w-[280px] md:min-w-[340px] lg:min-w-[400px] flex-shrink-0 snap-start group/card cursor-pointer"
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover/card:border-accent/50 group-hover/card:shadow-[0_0_25px_rgba(229,9,20,0.3)] transition-all duration-300 group-hover/card:-translate-y-2">
                <Image
                  src={event.poster}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  sizes="(max-width: 768px) 280px, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />
                <div className="absolute top-3 left-3 bg-accent/90 text-white text-xs font-bold px-3 py-1.5 rounded backdrop-blur-md shadow-lg shadow-accent/20">
                  {event.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out flex justify-center">
                  <div className="w-full bg-accent/90 backdrop-blur-md text-white py-2.5 rounded-xl text-sm font-semibold shadow-lg text-center transform hover:scale-105 transition-transform">
                    View Details
                  </div>
                </div>
              </div>
              <div className="px-1">
                <h3 className="font-display font-semibold text-white text-xl line-clamp-1 group-hover/card:text-accent transition-colors">
                  {event.title}
                </h3>
                <div className="flex flex-col gap-1.5 mt-2.5">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Calendar className="w-4 h-4 text-white/50" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <MapPin className="w-4 h-4 text-white/50" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
