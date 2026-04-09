'use client'

import MovieSection from "@/components/layout/MovieSection";
import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/sidebar";
import PageTransition from "@/components/shared-components/page-transition";
import { useMovies } from "@/hooks/useMovie";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { useSearch } from "@/providers/SearchContent";

export default function HomePage() {
  useSearchMovies();

  const { results, query } = useSearch()
  const { movies, loading } = useMovies();

  const isSearching = query.length > 0;
  const moviesToShow = query ? results : movies;

  return (
    <PageTransition>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-black text-white p-10 overflow-hidden pt-20 md:pt-10">

          <div className="sticky top-0 z-50">
            <Navbar />
          </div>

          <MovieSection
            title={isSearching ? "Search Results" : "Trending"}
            movies={moviesToShow}
            loading={loading}
          />
        </main>
      </div>
    </PageTransition>
  );
}