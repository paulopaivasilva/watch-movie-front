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
    nextPageToken: item?.nextPageToken
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

export async function getInfiniteMovies(
  pageToken?: string,
  filters?: { category: string; sort: string, order?: string }
) {
  const sortMap: Record<string, string> = {
    popular: "SORT_BY_POPULARITY",
    latest: "SORT_BY_YEAR",
    upcoming: "SORT_BY_RELEASE_DATE",
  };

  const sortOrderMap: Record<string, string> = {
    asc: 'ASC',
    desc: 'DESC'
  }

  const sortBy = sortMap[filters?.sort || "popular"];
  const sortOrder = sortOrderMap[filters?.order || "desc"]
  const category = filters?.category || "movies";

  const data = await apiFetch<any>(
    `/titles?types=${category}&sortBy=${sortBy}&sortOrder=${sortOrder}${
      pageToken ? `&pageToken=${pageToken}` : ""
    }`
  );

  return {
    movies: (data.titles ?? []).map((item: any) => ({
      id: item.id,
      title: item.primaryTitle,
      poster: item.primaryImage?.url,
      year: item.startYear,
      genre: item.genres?.[0] || "Unknown",
    })),
    nextPageToken: data.nextPageToken,
  };
}

export async function getFilteredMovies({
  category,
  sort,
}: {
  category: string;
  sort: string;
}) {
  const sortMap: Record<string, string> = {
    popular: "SORT_BY_POPULARITY",
    latest: "SORT_BY_YEAR",
    upcoming: "SORT_BY_RELEASE_DATE",
  };

  const data = await apiFetch<any>(
    `/titles?types=${category}&sortBy=${sortMap[sort]}`
  );

  return (data.titles ?? []).map((item: any) => ({
    id: item.id,
    title: item.primaryTitle,
    poster: item.primaryImage?.url,
    year: item.startYear,
    genre: item.genres?.[0] || "Unknown",
  }));
}

export async function getMoviesByIds(ids: string[]) {
  if (!ids.length) return [];

  const query = ids.map((id) => `titleIds=${id}`).join("&");

  const data = await apiFetch<any>(`/titles:batchGet?${query}`);

  return (data.titles ?? []).map((item: any) => ({
    id: item.id,
    title: item.primaryTitle,
    poster: item.primaryImage?.url,
    year: item.startYear,
    genre: item.genres?.[0] || "Unknown",
  }));
}

export async function getMovieById(id: string) {
  const data = await apiFetch<any>(`/titles/${id}`);

  return {
    id: data.id,
    title: data.primaryTitle,
    image: data.primaryImage?.url,
    year: data.startYear,
    runtime: data.runtimeSeconds,
    genres: data.genres || [],
    rating: data.rating?.aggregateRating,
    plot: data.plot,
  };
}