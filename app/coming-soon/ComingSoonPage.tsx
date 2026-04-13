"use client";

import AppLayout from "@/components/layout/AppLayout";
import MovieGrid from "@/components/layout/MovieGrid";
import { useTrendingInfinite } from "@/hooks/useMovieInfinite";
import { useSearch } from "@/providers/SearchContent";
import { useFilter } from "@/providers/FilterContext";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import Title from "@/components/layout/Title";
import MovieModal from "@/components/shared-components/movie/MovieModal";
import { useState } from "react";

export default function ComingSoonPage() {
  useSearchMovies();

  const { query, results } = useSearch();
  const { category } = useFilter();

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
  } = useTrendingInfinite({
    category,
    sort: "upcoming",
    order: "desc"
  });

  const infiniteMovies =
    data?.pages?.flatMap((page) => page?.movies ?? []) ?? [];

  const moviesToShow = isSearching ? results : infiniteMovies;

  return (
    <AppLayout isError={isError} onRetry={refetch}>
      <Title>{isSearching ? "Search Results" : "Coming Soon"}</Title>

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