"use client";

import AppLayout from "@/components/layout/AppLayout";
import MovieGrid from "@/components/layout/MovieGrid";
import Title from "@/components/layout/Title";
import { useFavouriteMovies } from "@/hooks/useFavouritesMovies";
import { useSearch } from "@/providers/SearchContent";
import { useSearchMovies } from "@/hooks/useSearchMovies";

export default function FavouritesPage() {
  useSearchMovies();

  const { movies, loading, empty } = useFavouriteMovies();
  const { query, results } = useSearch();

  const isSearching = query.length > 0;

  const moviesToShow = isSearching ? results : movies;

  return (
    <AppLayout>
      <Title>
        {isSearching ? "Search Results" : "Favourites"}
      </Title>

      {!isSearching && empty && (
        <div className="text-white/50">
          You have no favourite movies yet.
        </div>
      )}

      {loading && !isSearching ? (
        <div className="text-white/50">Loading...</div>
      ) : (
        <MovieGrid movies={moviesToShow} />
      )}
    </AppLayout>
  );
}