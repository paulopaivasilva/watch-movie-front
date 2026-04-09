"use client";

import { useEffect, useState } from "react";

const KEY = "favourite-movies";

export function useFavourites() {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
  const stored = localStorage.getItem(KEY);
  if (stored) setIds(JSON.parse(stored));
  setLoaded(true); // 👈 importante
}, []);

  // carregar do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) setIds(JSON.parse(stored));
  }, []);

  // salvar sempre que mudar
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids]);

  const toggleFavourite = (id: string) => {
    setIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const isFavourite = (id: string) => ids.includes(id);

  return {
    ids,
    toggleFavourite,
    isFavourite,
    loaded
  };
}