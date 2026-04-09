"use client";

import AppLayout from "@/components/layout/AppLayout";
import MovieGrid from "@/components/layout/MovieGrid";
import { useFavouriteMovies } from "@/hooks/useFavouritesMovies";

export default function FavouritesPage() {
  const { movies, loading, empty } = useFavouriteMovies();

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold mb-6">
        Favourites
      </h1>

      {empty && (
        <div className="text-white/50">
          You have no favourite movies yet.
        </div>
      )}

      {loading ? (
        <div className="text-white/50">Loading...</div>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </AppLayout>
  );
}