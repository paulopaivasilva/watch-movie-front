"use client";

import { createContext, useContext, useState } from "react";

type Category = "MOVIE" | "TV_SERIES" | "TV_MINI_SERIES";
type Sort = "popular" | "latest" | "upcoming";

interface FilterContextType {
  category: Category;
  setCategory: (c: Category) => void;
  sort: Sort;
  setSort: (s: Sort) => void;
}

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState<Category>("MOVIE");
  const [sort, setSort] = useState<Sort>("popular");

  return (
    <FilterContext.Provider value={{ category, setCategory, sort, setSort }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilter must be used within FilterProvider");
  return ctx;
}