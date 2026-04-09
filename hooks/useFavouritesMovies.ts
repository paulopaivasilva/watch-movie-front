"use client";

import { useQuery } from "@tanstack/react-query";
import { useFavourites } from "./useFavourites";
import { getMoviesByIds } from "@/services/movies.service";

export function useFavouriteMovies() {
  const { ids, loaded } = useFavourites();

  const { data, isLoading } = useQuery({
    queryKey: ["favourites", ids],
    queryFn: () => getMoviesByIds(ids),
    enabled: loaded && ids.length > 0, // 🔥 CORRETO
  });

  return {
    movies: data || [],
    loading: isLoading,
    empty: loaded && ids.length === 0,
  };
}