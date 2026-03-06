"use client";

import { Search, Menu, User, Bell, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "@/components/AppImage";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user, profile, loading: authLoading, signOut } = useAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery("");
      return;
    }
    router.push("/search");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setShowNotifications(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = profile
    ? [profile.first_name, profile.last_name].filter(Boolean).join(" ") || user?.email?.split("@")[0] || "User"
    : user?.email?.split("@")[0] || "User";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out border-b border-transparent px-4 md:px-8",
        scrolled ? "py-3 glass-panel border-glass-border/50" : "py-5 bg-gradient-to-b from-background/80 to-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-shadow duration-300">
              <span className="font-display font-bold text-lg leading-none mt-0.5 text-white">R</span>
            </div>
            <span className="font-display font-semibold text-xl tracking-tight text-gradient">ReelBook</span>
          </Link>

          <form onSubmit={handleSearchSubmit} className="hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-text-muted group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 text-sm rounded-full pl-10 pr-11 py-2 w-64 md:w-80 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-text-muted text-white"
                placeholder="Search movies, events, venues..."
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-white transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted">
            <Link href="/movies" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Movies</Link>
            <Link href="/events" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Events</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/search" className="p-2 text-text-muted hover:text-white transition-colors md:hidden" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>

            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowMobileMenu(false); }}
                className="p-2 text-text-muted hover:text-white transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-background"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] glass-panel rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 z-50 animate-fade-in origin-top-right">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-semibold text-white">Notifications</h3>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">2 New</span>
                  </div>
                  <div className="space-y-2">
                    <Link href="/movies/7" className="flex gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors group">
                      <div className="w-12 h-16 relative rounded-lg overflow-hidden shrink-0 border border-white/10">
                        <Image src="https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg" alt="Dune 2" fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-primary transition-colors">Dune: Part Two</p>
                        <p className="text-xs text-text-muted mt-0.5 line-clamp-2">Now in theaters! Book your IMAX tickets today.</p>
                        <p className="text-[10px] text-primary mt-1 font-semibold uppercase tracking-wider">New Release</p>
                      </div>
                    </Link>
                    <Link href="/movies/4" className="flex gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors group">
                      <div className="w-12 h-16 relative rounded-lg overflow-hidden shrink-0 border border-white/10">
                        <Image src="https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" alt="Inception" fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-primary transition-colors">Inception</p>
                        <p className="text-xs text-text-muted mt-0.5 line-clamp-2">Special re-release showing this weekend only.</p>
                        <p className="text-[10px] text-accent mt-1 font-semibold uppercase tracking-wider">Limited Time</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {!authLoading && user ? (
              <div className="relative ml-2" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline max-w-[120px] truncate">{displayName}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-white/10 z-50 animate-fade-in">
                    <p className="px-3 py-2 text-sm font-medium text-white truncate">{displayName}</p>
                    {user.email && <p className="px-3 py-0 text-xs text-text-muted truncate">{user.email}</p>}
                    <button
                      onClick={() => { signOut(); setShowUserMenu(false); }}
                      className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-text-muted hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-3 py-1.5 rounded-full text-sm font-medium ml-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            <div className="relative md:hidden" ref={mobileMenuRef}>
              <button
                onClick={() => { setShowMobileMenu(!showMobileMenu); setShowNotifications(false); }}
                className="p-2 text-text-muted hover:text-white transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              {showMobileMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 glass-panel rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 z-50 animate-fade-in origin-top-right">
                  <h3 className="font-display font-semibold text-white mb-3 px-1">Menu</h3>
                  <nav className="flex flex-col gap-1">
                    <Link href="/movies" onClick={() => setShowMobileMenu(false)} className="px-3 py-2.5 rounded-xl text-sm text-text-muted hover:bg-white/10 hover:text-white transition-colors">Movies</Link>
                    <Link href="/events" onClick={() => setShowMobileMenu(false)} className="px-3 py-2.5 rounded-xl text-sm text-text-muted hover:bg-white/10 hover:text-white transition-colors">Events</Link>
                    {user ? (
                      <Link href="/" onClick={() => setShowMobileMenu(false)} className="px-3 py-2.5 rounded-xl text-sm text-text-muted hover:bg-white/10 hover:text-white transition-colors">My Bookings</Link>
                    ) : (
                      <Link href="/login" onClick={() => setShowMobileMenu(false)} className="px-3 py-2.5 rounded-xl text-sm text-primary hover:bg-white/10 transition-colors font-medium">Sign In</Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
