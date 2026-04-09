"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfiniteMovies } from "@/services/movies.service";

export function useTrendingInfinite({
  category,
  sort,
  order,
}: {
  category: string;
  sort: string;
  order?: string;
}) {
  return useInfiniteQuery({
    queryKey: ["trending-infinite", category, sort, order],

    queryFn: ({ pageParam }) =>
      getInfiniteMovies(pageParam, { category, sort }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => {
      return lastPage?.nextPageToken || undefined;
    },

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}