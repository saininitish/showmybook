"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const OFFERS = [
  {
    id: "o1",
    title: "Unlock Premium Experiences",
    subtitle: "Join ReelBook Pro and get exclusive pre-sale access to top concerts, zero convenience fees, and free popcorn upgrades.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200",
    theme: "from-primary/10 to-accent/5",
    buttonText: "Explore Pro"
  },
  {
    id: "o2",
    title: "50% Off on Food & Beverage",
    subtitle: "Pre-book your snacks online and enjoy a massive discount. Skip the queue and get it delivered to your seat!",
    image: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=1200",
    theme: "from-yellow-500/10 to-orange-500/5",
    buttonText: "View Menu"
  },
  {
    id: "o3",
    title: "Weekend Concert Getaway",
    subtitle: "Book tickets for 2 or more for any music festival this weekend and get 20% off your total bill.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200",
    theme: "from-blue-500/10 to-cyan-500/5",
    buttonText: "See Offers"
  }
];

export default function OfferCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + OFFERS.length) % OFFERS.length);

  return (
    <section className="py-8 w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="relative group/carousel rounded-3xl overflow-hidden glass-panel border-white/10 h-[280px] md:h-[240px]">
        {OFFERS.map((offer, idx) => (
          <div
            key={offer.id}
            className={cn(
              "absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6 transition-all duration-700 ease-in-out bg-gradient-to-r",
              offer.theme,
              currentIndex === idx ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-12 pointer-events-none"
            )}
          >
            <div className="absolute inset-0 z-0">
              <Image 
                src={offer.image} 
                alt={offer.title} 
                fill 
                className="object-cover opacity-10 object-center transition-transform duration-1000 group-hover/carousel:scale-105" 
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            </div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">
                {offer.title}
              </h2>
              <p className="text-text-muted line-clamp-2 md:line-clamp-none">
                {offer.subtitle}
              </p>
            </div>
            
            <button className="relative z-10 shrink-0 bg-white text-background hover:bg-gray-200 px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-xl whitespace-nowrap">
              {offer.buttonText}
            </button>
          </div>
        ))}

        {/* Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white/10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {OFFERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentIndex === idx ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to offer ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
