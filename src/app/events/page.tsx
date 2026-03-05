"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown, Calendar as CalendarIcon, MapPin, Search } from "lucide-react";
import { useState } from "react";

const EVENTS = [
  { id: "e1", title: "Coldplay: Music Of The Spheres", category: "Concert", date: "Oct 15, 2026", venue: "National Stadium", price: "From ₹4,500", poster: "https://images.unsplash.com/photo-1540039155732-6761b54f6cce?q=80&w=1000&auto=format&fit=crop" },
  { id: "e2", title: "Standup Comedy Special", category: "Comedy", date: "Aug 10, 2026", venue: "Laugh Club", price: "From ₹999", poster: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=1000&auto=format&fit=crop" },
  { id: "e3", title: "Tech Innovators Conference", category: "Conference", date: "Sep 05, 2026", venue: "Expo Center", price: "From ₹2,000", poster: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop" },
  { id: "e4", title: "Symphony Orchestra", category: "Classical", date: "Nov 20, 2026", venue: "Grand Theater", price: "From ₹1,500", poster: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000&auto=format&fit=crop" },
  { id: "e5", title: "Electronic Dance Night", category: "EDM", date: "Jul 25, 2026", venue: "Warehouse 5", price: "From ₹3,000", poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop" },
  { id: "e6", title: "Food & Wine Festival", category: "Festival", date: "Dec 12, 2026", venue: "Central Park", price: "From ₹500", poster: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" },
];

const ALL_CATEGORIES = ["All", "Concert", "Comedy", "Conference", "Classical", "EDM", "Festival"];
const DATES = ["Any Date", "Oct 15, 2026", "Aug 10, 2026", "Sep 05, 2026", "Nov 20, 2026", "Jul 25, 2026", "Dec 12, 2026"];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Any Date");
  
  const [showCategories, setShowCategories] = useState(false);
  const [showDates, setShowDates] = useState(false);

  const filteredEvents = EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesDate = selectedDate === "Any Date" || event.date === selectedDate;
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-white mb-2">Live Events</h1>
            <p className="text-text-muted">Discover concerts, comedy shows, and more.</p>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search events or venues..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-colors w-full sm:w-64"
              />
            </div>

            <div className="relative flex-1 sm:flex-none">
              <button 
                onClick={() => { setShowDates(false); setShowCategories(!showCategories); }}
                className="w-full glass-panel px-4 py-2 rounded-full text-sm font-medium flex items-center justify-between sm:justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                {selectedCategory === "All" ? "Categories" : selectedCategory} <ChevronDown className="w-4 h-4" />
              </button>
              {showCategories && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-xl p-2 z-30 shadow-2xl border-white/10 animate-fade-in origin-top-right">
                  {ALL_CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => { setSelectedCategory(category); setShowCategories(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category ? 'bg-accent/20 text-accent font-semibold' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-1 sm:flex-none">
              <button 
                onClick={() => { setShowCategories(false); setShowDates(!showDates); }}
                className="w-full glass-panel px-4 py-2 rounded-full text-sm font-medium flex items-center justify-between sm:justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Filter className="w-4 h-4" /> {selectedDate === "Any Date" ? "Dates" : selectedDate}
              </button>
              {showDates && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-xl p-2 z-30 shadow-2xl border-white/10 animate-fade-in origin-top-right">
                  {DATES.map(date => (
                    <button
                      key={date}
                      onClick={() => { setSelectedDate(date); setShowDates(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedDate === date ? 'bg-accent/20 text-accent font-semibold' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id} className="group/card block">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover/card:border-accent/50 group-hover/card:shadow-[0_0_25px_rgba(229,9,20,0.3)] transition-all duration-300 group-hover/card:-translate-y-2">
                  <Image
                    src={event.poster}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 bg-accent/90 text-white text-xs font-bold px-3 py-1.5 rounded backdrop-blur-md shadow-lg shadow-accent/20 z-10">
                    {event.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-white text-sm font-medium z-10 group-hover/card:opacity-0 transition-opacity">
                    {event.price}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out flex justify-center z-20">
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
                      <CalendarIcon className="w-4 h-4 text-white/50" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <MapPin className="w-4 h-4 text-white/50" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
              <p className="text-xl text-white font-medium mb-2">No events found</p>
              <p className="text-text-muted">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedDate("Any Date"); }}
                className="mt-6 text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
