"use client";

import AppLayout from "@/components/layout/AppLayout";
import MovieGrid from "@/components/layout/MovieGrid";
import Title from "@/components/layout/Title";
import { useFavouriteMovies } from "@/hooks/useFavouritesMovies";
import { useSearch } from "@/providers/SearchContent";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { useState } from "react";
import MovieModal from "@/components/shared-components/movie/MovieModal";

export default function FavouritesPage() {
  useSearchMovies();

  const { movies, loading, empty, isError, refetch, error } = useFavouriteMovies();
  const { query, results } = useSearch();

  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  const isSearching = query.length > 0;
  const moviesToShow = isSearching ? results : movies;

  return (
    <AppLayout isError={isError} onRetry={refetch}>
      <Title>
        {isSearching ? "Search Results" : "Favourites"}
      </Title>

      {!isSearching && empty && (
        <div className="text-white">
          You have no favourite movies yet.
        </div>
      )}

      {loading && !isSearching ? (
        <div className="text-white">Loading...</div>
      ) : (
        <MovieGrid
          movies={moviesToShow}
          onSelect={(id) => setSelectedMovie(id)}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movieId={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </AppLayout>
  );
}