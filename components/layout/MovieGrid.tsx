"use client";

import MovieCard from "@/components/shared-components/movie/MovieCard";
import NotFound from "@/assets/images/not-image.jpg";

interface MovieGridProps {
  movies: any[];
  onSelect: (id: string) => void
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,348px)] gap-8">
      {movies.map((movie, index) => (
        <MovieCard
          key={`${movie.id}-${index}`}
          image={movie.poster || NotFound}
          {...movie}
          onClick={() => onSelect(movie.id)}
        />
      ))}
    </div>
  );
}