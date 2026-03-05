"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { useRef } from "react";

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  rating: number;
}

const DUMMY_MOVIES: Movie[] = [
  { id: "1", title: "Oppenheimer", genre: "Biography • Drama", rating: 8.6, poster: "https://image.tmdb.org/t/p/w500/8Gxv8gS8UPTFyHB0fuQwUDQ0xYA.jpg" },
  { id: "2", title: "The Batman", genre: "Action • Crime", rating: 7.8, poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
  { id: "3", title: "Spider-Man: Spider-Verse", genre: "Animation • Action", rating: 8.6, poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
  { id: "4", title: "Inception", genre: "Action • Sci-Fi", rating: 8.8, poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5ucge.jpg" },
  { id: "5", title: "Interstellar", genre: "Sci-Fi • Thriller", rating: 8.6, poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOVSAxFewqsziyTo4hN.jpg" },
  { id: "6", title: "John Wick", genre: "Action • Thriller", rating: 7.4, poster: "https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg" },
];

export default function MovieScroller({ title }: { title: string }) {
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
          <div className="h-0.5 w-12 bg-primary rounded-full" />
        </h2>
        <Link href="/movies" className="text-text-muted hover:text-primary transition-colors flex items-center text-sm font-medium">
          See All <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="relative group/nav">
        {/* Navigation Buttons */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover/nav:opacity-100 transition-all hover:bg-primary/20 hover:border-primary/50 hidden md:flex"
        >
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover/nav:opacity-100 transition-all hover:bg-primary/20 hover:border-primary/50 hidden md:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 pt-2 snap-x snap-mandatory"
        >
          {DUMMY_MOVIES.map((movie) => (
            <Link 
              href={`/movies/${movie.id}`}
              key={movie.id} 
              className="min-w-[160px] md:min-w-[220px] lg:min-w-[260px] flex-shrink-0 snap-start group/card cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover/card:border-primary/50 group-hover/card:shadow-[0_0_25px_rgba(124,58,237,0.3)] transition-all duration-300 group-hover/card:-translate-y-2">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  sizes="(max-width: 768px) 160px, 260px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out flex justify-center">
                  <div className="w-full bg-primary/90 backdrop-blur-md text-white py-2.5 rounded-xl text-sm font-semibold shadow-lg text-center transform hover:scale-105 transition-transform">
                    Book Now
                  </div>
                </div>
              </div>
              <div className="px-1">
                <h3 className="font-display font-semibold text-white text-lg line-clamp-1 group-hover/card:text-primary transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-text-muted">{movie.genre}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-yellow-500 text-sm font-medium">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{movie.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
