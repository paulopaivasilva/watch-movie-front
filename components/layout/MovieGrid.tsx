"use client";

import MovieCard from "@/components/shared-components/movie/MovieCard";
import NotFound from "@/assets/images/not-image.png";

interface MovieGridProps {
  movies: any[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          image={movie.poster || NotFound}
          year={String(movie.year)}
          genre={movie.genre}
        />
      ))}
    </div>
  );
}