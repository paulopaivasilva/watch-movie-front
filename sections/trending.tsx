"use client";

import Section from "@/components/shared-components/Section";
import Carousel from "@/components/shared-components/Carousel";
import MovieCard from "@/components/shared-components/movie/MovieCard";
import { useTrendingMovies } from "@/hooks/useMovie";

export default function Trending() {
  const { movies, loading } = useTrendingMovies();

  return (
    <Section title="Trending">
      <Carousel>
        {loading
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-55 h-80 bg-white/10 animate-pulse rounded-2xl"
              />
            ))
          : movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.poster}
                year={String(movie.year)}
                genre={movie.genre}
              />
            ))}
      </Carousel>
    </Section>
  );
}