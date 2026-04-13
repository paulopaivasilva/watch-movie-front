"use client";

import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/services/movies.service";

export function useMovieDetails(id?: string) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => getMovieById(id!),
    enabled: !!id,
  });
}