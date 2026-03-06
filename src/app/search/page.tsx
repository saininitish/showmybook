"use client";

import Navbar from "@/components/Navbar";
import Image from "@/components/AppImage";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { Search, Star, Calendar, MapPin, Film, CalendarDays } from "lucide-react";
import { SEARCH_MOVIES, SEARCH_EVENTS } from "@/lib/search-data";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const qFromUrl = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(qFromUrl);

  useEffect(() => {
    setQuery(qFromUrl);
  }, [qFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const q = qFromUrl.trim().toLowerCase();
  const movies = q
    ? SEARCH_MOVIES.filter(
        (m) =>
          m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q)
      )
    : [];
  const events = q
    ? SEARCH_EVENTS.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      )
    : [];
  const hasResults = movies.length > 0 || events.length > 0;
  const hasQuery = q.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, events, venues..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors text-base"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {!hasQuery && (
          <div className="text-center py-16 text-text-muted">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Type something and press Search or Enter.</p>
            <p className="text-sm mt-1">Find movies by title or genre, events by name or venue.</p>
          </div>
        )}

        {hasQuery && !hasResults && (
          <div className="text-center py-16">
            <p className="text-xl text-white font-medium mb-2">No results for &quot;{qFromUrl}&quot;</p>
            <p className="text-text-muted">Try a different keyword or check spelling.</p>
            <Link href="/" className="inline-block mt-6 text-primary hover:text-primary/80 font-medium">
              Back to Home
            </Link>
          </div>
        )}

        {hasQuery && hasResults && (
          <div className="space-y-12">
            {movies.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Film className="w-5 h-5 text-primary" />
                  Movies ({movies.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {movies.map((movie) => (
                    <Link
                      href={`/movies/${movie.id}`}
                      key={movie.id}
                      className="group/card block"
                    >
                      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 border border-white/5 group-hover/card:border-primary/50 transition-all">
                        <Image
                          src={movie.poster}
                          alt={movie.title}
                          fill
                          className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 20vw"
                        />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded text-yellow-500 text-sm">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {movie.rating}
                        </div>
                      </div>
                      <h3 className="font-semibold text-white line-clamp-1 group-hover/card:text-primary">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-text-muted mt-0.5">{movie.genre}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {events.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-accent" />
                  Events ({events.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Link
                      href={`/events/${event.id}`}
                      key={event.id}
                      className="group/card block"
                    >
                      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-3 border border-white/5 group-hover/card:border-accent/50 transition-all">
                        <Image
                          src={event.poster}
                          alt={event.title}
                          fill
                          className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-2 left-2 bg-accent/90 text-white text-xs font-bold px-2 py-1 rounded">
                          {event.category}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                          {event.price}
                        </div>
                      </div>
                      <h3 className="font-semibold text-white line-clamp-1 group-hover/card:text-accent">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-sm text-text-muted">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
