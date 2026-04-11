"use client";

import { createContext, useContext, useEffect, useState } from "react";

const KEY = "favourite-movies";

interface FavouritesContextType {
  ids: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  loaded: boolean;
}

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) setIds(JSON.parse(stored));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(KEY, JSON.stringify(ids));
    }
  }, [ids, loaded]);

  const toggleFavourite = (id: string) => {
    setIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const isFavourite = (id: string) => ids.includes(id);

  return (
    <FavouritesContext.Provider
      value={{ ids, toggleFavourite, isFavourite, loaded }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used within provider");
  return ctx;
}