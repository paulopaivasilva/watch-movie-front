"use client";

import Section from "@/components/shared-components/Section";
import Carousel from "@/components/shared-components/Carousel";
import MovieCard from "@/components/shared-components/movie/MovieCard";
import NotFound from '@/assets/images/not-image.png'

interface MovieSectionProps {
  title: string;
  movies: any[];
  loading?: boolean;
}

export default function MovieSection({
  title,
  movies,
  loading = false,
}: MovieSectionProps) {
  return (
    <Section title={title}>
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
                image={movie.primaryImage?.url || movie.poster || NotFound}
                year={String(movie.startYear || movie.year)}
                genre={movie.genre || ""}
              />
            ))}
      </Carousel>
    </Section>
  );
}