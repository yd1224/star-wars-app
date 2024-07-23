"use client";

import React, { useEffect, useCallback } from "react";
import { SimpleGrid, Box, Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getHeroesListPages, STAR_WARS_API_BASE_URL } from "@/lib/api";
import HeroCard from "./hero-card";
import { useInView } from "react-intersection-observer";
import { ApiResponse, Hero } from "@/lib/types";

export interface HeroesListProps {
  heroes?: Hero[];
}

export default function HeroesList() {
  const { ref, inView } = useInView();

  const defaultEndPoint = `${STAR_WARS_API_BASE_URL}people/`;

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ApiResponse, Error>({
      queryKey: ["heroes"],
      queryFn: async ({ pageParam = defaultEndPoint }) =>
        await getHeroesListPages(pageParam as string),
      initialPageParam: defaultEndPoint,
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      staleTime: 1e6,
    });

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (inView && hasNextPage) {
      handleFetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, handleFetchNextPage]);

  const allHeroes = data?.pages.flatMap((page) => page.results) || [];

  return (
    <Box p="4">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="8">
        {allHeroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </SimpleGrid>
      {hasNextPage && !isFetchingNextPage && (
        <Box ref={ref} display="flex" justifyContent="center" mt={4}>
          <Spinner size="lg" color="#ff6b0a" />
        </Box>
      )}
    </Box>
  );
}
