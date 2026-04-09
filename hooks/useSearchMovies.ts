"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@/providers/SearchContent";
import { searchMovies } from "@/services/movies.service";
import { useEffect, useState } from "react";

export function useSearchMovies() {
  const { query, setResults } = useSearch();
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data } = useQuery({
    queryKey: ["search-movies", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: !!debouncedQuery,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
    } else if (data) {
      setResults(data);
    }
  }, [data, debouncedQuery]);

  return {
    results: data || [],
  };
}