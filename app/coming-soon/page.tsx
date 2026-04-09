"use client";

import AppLayout from "@/components/layout/AppLayout";
import MovieGrid from "@/components/layout/MovieGrid";
import { useTrendingInfinite } from "@/hooks/useMovieInfinite";
import { useSearch } from "@/providers/SearchContent";
import { useFilter } from "@/providers/FilterContext";
import { useSearchMovies } from "@/hooks/useSearchMovies";

export default function ComingSoonPage() {
  useSearchMovies();

  const { query, results } = useSearch();
  const { category } = useFilter();

  const isSearching = query.length > 0;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useTrendingInfinite({
    category,
    sort: "upcoming",
    order: "asc"
  });

  const infiniteMovies =
    data?.pages?.flatMap((page) => page?.movies ?? []) ?? [];

  const moviesToShow = isSearching ? results : infiniteMovies;

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold mb-6">
        {isSearching ? "Search Results" : "Coming Soon"}
      </h1>

      {isLoading && !isSearching ? (
        <div className="text-white/50">Loading...</div>
      ) : (
        <MovieGrid movies={moviesToShow} />
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
    </AppLayout>
  );
}