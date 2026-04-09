"use client";

import { useQuery } from "@tanstack/react-query";
import { getFilteredMovies } from "@/services/movies.service";
import { useFilter } from "@/providers/FilterContext";

export function useMovies() {
  const { category, sort } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["movies", category, sort],
    queryFn: () => getFilteredMovies({ category, sort }),
    staleTime: 1000 * 60 * 10,
  });

  return {
    movies: data || [],
    loading: isLoading,
  };
}