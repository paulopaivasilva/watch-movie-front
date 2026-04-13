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
  const query = useInfiniteQuery({
    queryKey: ["trending-infinite", category, sort, order],

    queryFn: ({ pageParam }) =>
      getInfiniteMovies(pageParam, { category, sort, order }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => {
      return lastPage?.nextPageToken || undefined;
    },

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    retry: 2,
  });

  return {
    ...query,

    movies:
      query.data?.pages?.flatMap((page) => page?.movies ?? []) ?? [],

    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}