"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/services/movies.service";

export function useTrendingMovies() {
  const { data, isLoading } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: getTrendingMovies,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  });

  return { movies: data || [], loading: isLoading };
}