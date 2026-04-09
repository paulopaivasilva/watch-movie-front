import { apiFetch } from "./api";
import { Movie } from "@/types/movies";

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await apiFetch<any>("/titles?sortBy=SORT_BY_POPULARITY");

  return data.titles.map((item: any) => ({
    id: item.id,
    title: item.primaryTitle,
    poster: item.primaryImage?.url,
    year: item.startYear,
    genre: item.genres?.[0] || "Unknown",
  }));
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await apiFetch<any>(`/search/titles?query=${query}`);

  return data.titles?.map((item: any) => ({
    id: item.id,
    title: item.primaryTitle,
    poster: item.primaryImage?.url,
    year: item.startYear,
    genre: item.genres?.[0] || "Unknown",
  })) || [];
}