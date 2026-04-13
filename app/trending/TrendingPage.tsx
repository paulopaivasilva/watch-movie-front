"use client";

import AppLayout from "@/components/layout/AppLayout";
import MovieGrid from "@/components/layout/MovieGrid";
import { useTrendingInfinite } from "@/hooks/useMovieInfinite";
import { useSearch } from "@/providers/SearchContent";
import { useFilter } from "@/providers/FilterContext";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { useState } from "react";
import MovieModal from "@/components/shared-components/movie/MovieModal";

export default function TrendingPage() {
  useSearchMovies();

  const { query, results } = useSearch();
  const { category, sort } = useFilter();

  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  const isSearching = query.length > 0;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch
  } = useTrendingInfinite({ category, sort, order: "asc" });

  const infiniteMovies =
    data?.pages?.flatMap((page) => page?.movies ?? []) ?? [];

  const moviesToShow = isSearching ? results : infiniteMovies;

  return (
    <AppLayout isError={isError} onRetry={refetch}>
      <h1 className="text-2xl font-semibold mb-6">
        {isSearching ? "Search Results" : "Trending at this moment"}
      </h1>

      {isLoading && !isSearching ? (
        <div className="text-white">Loading...</div>
      ) : (
        <MovieGrid
          movies={moviesToShow}
          onSelect={(id) => setSelectedMovie(id)} />
      )}

      {!isSearching && hasNextPage && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => fetchNextPage()}
            className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
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