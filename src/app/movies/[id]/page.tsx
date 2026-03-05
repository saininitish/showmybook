import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Play, Star, Clock, Calendar } from "lucide-react";

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  // Mock data fetching based on ID
  const isDune = params.id === "7";
  const movie = {
    title: isDune ? "Dune: Part Two" : "Oppenheimer",
    genre: isDune ? "Action • Sci-Fi" : "Biography • Drama",
    rating: isDune ? 8.8 : 8.6,
    duration: "2h 46m",
    releaseDate: "Mar 01, 2026",
    poster: isDune ? "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg" : "https://image.tmdb.org/t/p/w500/8Gxv8gS8UPTFyHB0fuQwUDQ0xYA.jpg",
    backdrop: isDune ? "https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg" : "https://image.tmdb.org/t/p/original/rMvPXy8PUjj1o8o1pzgQbdNC39P.jpg",
    description: isDune 
      ? "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family." 
      : "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
  };

  const halls = [
    { id: "h1", name: "PVR: Nexus Mall (IMAX)", distance: "2.5 km", times: ["10:30 AM", "01:45 PM", "05:00 PM", "08:30 PM", "11:15 PM"] },
    { id: "h2", name: "INOX: City Center", distance: "4.1 km", times: ["11:00 AM", "03:15 PM", "07:30 PM"] },
    { id: "h3", name: "Cinepolis: Grand Arcade", distance: "6.8 km", times: ["12:15 PM", "04:30 PM", "09:00 PM"] },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      {/* Detail Hero */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={movie.backdrop} alt={movie.title} fill priority className="object-cover object-top opacity-50" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-end gap-8">
          <div className="w-40 md:w-56 shrink-0 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl relative">
            <Image src={movie.poster} alt={movie.title} fill className="object-cover" sizes="(max-width: 768px) 160px, 224px" />
          </div>
          
          <div className="flex-1 pb-2">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/80 mb-6">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-white">{movie.rating}/10</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                <Clock className="w-4 h-4" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                <Calendar className="w-4 h-4" />
                <span>{movie.releaseDate}</span>
              </div>
              <span className="px-3 py-1.5 text-text-muted">{movie.genre}</span>
            </div>

            <p className="text-text-muted max-w-2xl mb-8 leading-relaxed">
              {movie.description}
            </p>

            <button className="flex items-center gap-2 glass-panel hover:bg-white/10 text-white px-6 py-2.5 rounded-full font-semibold transition-all">
              <Play className="w-4 h-4" /> Trailer
            </button>
          </div>
        </div>
      </section>

      {/* Halls & Showtimes */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <h2 className="font-display text-2xl font-bold">Select Hall & Showtime</h2>
          <div className="flex gap-2">
            <div className="bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-sm font-semibold">Today, Mar 01</div>
            <div className="glass-panel text-text-muted px-4 py-1.5 rounded-full text-sm font-medium">Tomorrow</div>
          </div>
        </div>

        <div className="space-y-6">
          {halls.map((hall) => (
            <div key={hall.id} className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-start gap-6 hover:border-white/20 transition-colors">
              <div className="md:w-1/3 shrink-0">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  {hall.name}
                </h3>
                <p className="text-sm text-text-muted mt-1 flex items-center gap-1">
                  <span>📍</span> {hall.distance} away
                </p>
              </div>
              
              <div className="flex-1 flex flex-wrap gap-3">
                {hall.times.map((time, idx) => (
                  <Link 
                    key={idx}
                    href={`/login?redirect=/movies/${params.id}/seats?hall=${encodeURIComponent(hall.name)}&time=${encodeURIComponent(time)}`}
                    className="border border-primary/40 text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all text-center min-w-[100px]"
                  >
                    {time}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
