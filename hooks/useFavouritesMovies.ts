import { useFavourites } from "@/providers/FavouritesProvider";
import { getMoviesByIds } from "@/services/movies.service";
import { useQuery } from "@tanstack/react-query";

export function useFavouriteMovies() {
  const { ids, loaded } = useFavourites();

  const query = useQuery({
    queryKey: ["favourites", ids],
    queryFn: () => getMoviesByIds(ids),
    enabled: loaded && ids.length > 0,
    retry: 2,
  });

  return {
    movies: query.data || [],
    loading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,

    empty: loaded && ids.length === 0,
  };
}