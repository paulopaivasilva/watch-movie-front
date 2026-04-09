"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Bell } from "lucide-react";
import { useSearch } from "@/providers/SearchContent";
import { useFilter } from "@/providers/FilterContext";

export default function Navbar() {
  const types = [
    { label: "Movies", value: "MOVIE" },
    { label: "Series", value: "TV_SERIES" },
    { label: "Documentaries", value: "TV_SPECIAL" },
  ];

  const { category, setCategory } = useFilter();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const { query, setQuery } = useSearch()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        w-full py-4 mb-10 transition-all duration-300
        ${scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-linear-to-b from-black/80 to-transparent"
        }
      `}
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-6 text-white text-sm">
          {types.map((item) => (
            <span
              key={item.value}
              onClick={() => setCategory(item.value as any)}
              className={`cursor-pointer transition ${category === item.value
                  ? "text-purple-400"
                  : "text-white/70 hover:text-white"
                }`}
            >
              {item.label}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">

          <div ref={searchRef} className="relative flex items-center">

            <Search
              onClick={() => setSearchOpen(true)}
              className="w-5 h-5 text-white/70 cursor-pointer hover:text-white transition"
            />

            <div
              className={`
                absolute right-0 flex items-center overflow-hidden
                rounded-full border border-white/10 bg-white/10 backdrop-blur-md
                transition-all duration-300
                ${searchOpen ? "w-52 px-3 py-1.5 opacity-100 ml-2" : "w-0 opacity-0"}
              `}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus={searchOpen}
                placeholder="Search..."
                className="bg-transparent outline-none text-sm text-white placeholder:text-white/50 w-full"
              />
            </div>
          </div>

          <Bell className="w-5 h-5 text-white/70 cursor-pointer hover:text-white transition" />

          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://i.pravatar.cc/40"
              className="w-7 h-7 rounded-full"
            />
            <span className="text-white text-sm">Igor</span>
          </div>
        </div>
      </div>
    </div>
  );
}