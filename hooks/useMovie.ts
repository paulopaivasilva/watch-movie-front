"use client";

import { useQuery } from "@tanstack/react-query";
import { getFilteredMovies } from "@/services/movies.service";
import { useFilter } from "@/providers/FilterContext";

export function useMovies() {
  const { category, sort } = useFilter();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["movies", category, sort],
    queryFn: () => getFilteredMovies({ category, sort }),
    staleTime: 1000 * 60 * 10,
    retry: 2
  });

  return {
    movies: data || [],
    loading: isLoading,
    isError,
    error,
    refetch,
  };
}