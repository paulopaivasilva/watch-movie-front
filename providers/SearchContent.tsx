"use client";

import { createContext, useContext, useState } from "react";

interface Movie {
  id: string;
  primaryImage?: { url: string };
}

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  results: Movie[];
  setResults: (r: Movie[]) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  return (
    <SearchContext.Provider value={{ query, setQuery, results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}