"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Star, Filter, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const MOVIES = [
  { id: "1", title: "Oppenheimer", genre: "Biography • Drama", rating: 8.6, poster: "https://image.tmdb.org/t/p/w500/8Gxv8gS8UPTFyHB0fuQwUDQ0xYA.jpg" },
  { id: "2", title: "The Batman", genre: "Action • Crime", rating: 7.8, poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
  { id: "3", title: "Spider-Man: Spider-Verse", genre: "Animation • Action", rating: 8.6, poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
  { id: "4", title: "Inception", genre: "Action • Sci-Fi", rating: 8.8, poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5ucge.jpg" },
  { id: "5", title: "Interstellar", genre: "Sci-Fi • Thriller", rating: 8.6, poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOVSAxFewqsziyTo4hN.jpg" },
  { id: "6", title: "John Wick", genre: "Action • Thriller", rating: 7.4, poster: "https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg" },
  { id: "7", title: "Dune: Part Two", genre: "Action • Sci-Fi", rating: 8.8, poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg" },
  { id: "8", title: "Avatar", genre: "Action • Adventure", rating: 7.9, poster: "https://image.tmdb.org/t/p/w500/kyeqWdyKbpnzAoI14B2mJZzbfj5.jpg" },
];

const ALL_GENRES = ["All", "Action", "Sci-Fi", "Drama", "Animation", "Thriller", "Adventure"];

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMovies = MOVIES.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-white mb-2">Movies in Theaters</h1>
            <p className="text-text-muted">Explore the latest releases and book your tickets.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search movies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors w-full sm:w-64"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="glass-panel px-4 py-2 w-full sm:w-auto rounded-full text-sm font-medium flex items-center justify-between sm:justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" /> 
                  {selectedGenre === "All" ? "Filters" : selectedGenre}
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showFilters && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-xl p-2 z-30 shadow-2xl border-white/10 animate-fade-in origin-top-right">
                  {ALL_GENRES.map(genre => (
                    <button
                      key={genre}
                      onClick={() => {
                        setSelectedGenre(genre);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedGenre === genre ? 'bg-primary/20 text-primary font-semibold' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id} className="group/card block">
                {/* ... existing card code ... */}
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover/card:border-primary/50 group-hover/card:shadow-[0_0_25px_rgba(124,58,237,0.3)] transition-all duration-300 group-hover/card:-translate-y-2">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-yellow-500 text-sm font-medium z-10">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{movie.rating}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out flex justify-center z-20">
                    <div className="w-full bg-primary/90 backdrop-blur-md text-white py-2.5 rounded-xl text-sm font-semibold shadow-lg text-center transform hover:scale-105 transition-transform">
                      Book Now
                    </div>
                  </div>
                </div>
                <h3 className="font-display font-semibold text-white text-lg line-clamp-1 group-hover/card:text-primary transition-colors">
                  {movie.title}
                </h3>
                <p className="text-sm text-text-muted mt-1">{movie.genre}</p>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
              <p className="text-xl text-white font-medium mb-2">No movies found</p>
              <p className="text-text-muted">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedGenre("All"); }}
                className="mt-6 text-primary hover:text-primary/80 font-medium transition-colors"
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
