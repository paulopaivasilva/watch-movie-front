import { useFavourites } from "@/providers/FavouritesProvider";
import { getMoviesByIds } from "@/services/movies.service";
import { useQuery } from "@tanstack/react-query";

export function useFavouriteMovies() {
  const { ids, loaded } = useFavourites();

  const { data, isLoading } = useQuery({
    queryKey: ["favourites", ids],
    queryFn: () => getMoviesByIds(ids),
    enabled: loaded && ids.length > 0,
  });

  return {
    movies: data || [],
    loading: isLoading,
    empty: loaded && ids.length === 0,
  };
}