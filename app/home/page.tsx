"use client";

import AppLayout from "@/components/layout/AppLayout";
import MovieSection from "@/components/layout/MovieSection";
import { useMovies } from "@/hooks/useMovie";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { useSearch } from "@/providers/SearchContent";
import { useState } from "react";
import MovieModal from "@/components/shared-components/movie/MovieModal";

export default function HomePage() {
  useSearchMovies();

  const { results, query } = useSearch();
  const { movies, loading } = useMovies();

  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  const isSearching = query.length > 0;
  const moviesToShow = isSearching ? results : movies;

  return (
    <AppLayout>
      <MovieSection
        title={isSearching ? "Search Results" : "Trending"}
        movies={moviesToShow}
        loading={loading}
        onSelect={(id) => setSelectedMovie(id)}
      />

      {selectedMovie && (
        <MovieModal
          movieId={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </AppLayout>
  );
}