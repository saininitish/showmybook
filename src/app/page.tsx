import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MovieScroller from "@/components/MovieScroller";
import EventScroller from "@/components/EventScroller";
import OfferCarousel from "@/components/OfferCarousel";

export default function Home() {
  return (
    <div className="min-h-screen animate-fade-in relative">
      <Navbar />
      <Hero />
      
      <main className="relative z-20 pb-20 -mt-16 bg-gradient-to-b from-transparent via-background to-background">
        <MovieScroller title="Recommended Movies" />
        
        <OfferCarousel />

        <EventScroller title="Upcoming Events" />
        
        <MovieScroller title="Coming Soon" />
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-lg py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="font-display font-bold text-xs text-white">R</span>
            </div>
            <span className="font-display font-medium text-lg">ReelBook</span>
          </div>
          <p className="text-sm text-text-muted">© 2026 ReelBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
