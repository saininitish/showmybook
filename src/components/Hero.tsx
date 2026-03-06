"use client";

import Image from "@/components/AppImage";
import Link from "next/link";
import { Play, Calendar, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    id: "7",
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    backdrop: "https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    tags: ["IMAX", "Action • Sci-Fi"],
    rating: 8.8,
    type: "movie",
    link: "/movies/7"
  },
  {
    id: "e1",
    title: "Coldplay: Music Of The Spheres",
    description: "Experience a magical evening filled with their greatest hits, mind-bending visuals, and an atmosphere like never before.",
    backdrop: "https://images.unsplash.com/photo-1540039155732-6761b54f6cce?q=80&w=1920&auto=format&fit=crop",
    tags: ["Live Concert", "Mumbai"],
    rating: 9.5,
    type: "event",
    link: "/events/e1"
  },
  {
    id: "1",
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    backdrop: "https://image.tmdb.org/t/p/original/rMvPXy8PUjj1o8o1pzgQbdNC39P.jpg",
    tags: ["IMAX 70mm", "Biography • Drama"],
    rating: 8.6,
    type: "movie",
    link: "/movies/1"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-end pb-24 lg:pb-32 overflow-hidden group">
      {/* Background Images */}
      {HERO_SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out",
            currentSlide === index ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.backdrop}
            alt={slide.title}
            fill
            priority={index === 0}
            className={cn(
              "object-cover object-top",
              currentSlide === index ? "animate-[pulse-slow_8s_ease-in-out_infinite_alternate] scale-105" : "scale-100"
            )}
            sizes="100vw"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        aria-label="Previous slide"
        title="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-panel hidden md:flex md:items-center md:justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        aria-label="Next slide"
        title="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-panel hidden md:flex md:items-center md:justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8">
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={`content-${slide.id}`}
            className={cn(
              "max-w-2xl transition-all duration-700 absolute bottom-0 left-4 md:left-8",
              currentSlide === index 
                ? "opacity-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 translate-y-8 pointer-events-none"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={cn(
                "px-2.5 py-1 rounded text-xs font-bold tracking-wider uppercase",
                slide.type === "event" ? "bg-accent text-white" : "bg-white text-black"
              )}>
                {slide.tags[0]}
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-semibold glass-panel text-white border-white/20">
                {slide.tags[1]}
              </span>
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium ml-2">
                <Star className="w-4 h-4 fill-current" />
                <span>{slide.rating}</span>
              </div>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 leading-[1.1] tracking-tight text-shadow-lg">
              {slide.title}
            </h1>
            
            <p className="text-lg text-text-muted mb-8 line-clamp-3 md:line-clamp-none max-w-xl">
              {slide.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href={slide.link}
                className={cn(
                  "flex items-center gap-2 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover-lift",
                  slide.type === "event" 
                    ? "bg-accent hover:bg-accent/90 shadow-[0_0_20px_rgba(229,9,20,0.4)]" 
                    : "bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                )}
              >
                <Calendar className="w-5 h-5" />
                {slide.type === "event" ? "Book Event" : "Book Tickets"}
              </Link>
              {slide.type === "movie" && (
                <button className="flex items-center gap-2 glass-panel hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover-lift">
                  <Play className="w-5 h-5" />
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Dots Navigation */}
        <div className="absolute -bottom-16 md:-bottom-20 left-4 md:left-8 flex gap-3 z-30">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentSlide === idx ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
