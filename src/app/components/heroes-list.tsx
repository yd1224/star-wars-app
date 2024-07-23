"use client";

import React, { useEffect, useCallback } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getHeroesListPages, STAR_WARS_API_BASE_URL } from "@/lib/api";
import HeroCard from "./hero-card";
import { useInView } from "react-intersection-observer";
import { ApiResponse, Hero } from "@/lib/types";
import Loader from "./loader";

// Define the props interface for the HeroesList component
export interface HeroesListProps {
  heroes?: Hero[];
}

// HeroesList component to display a list of heroes with infinite scrolling
export default function HeroesList() {
  // Hook to detect if the component is in view
  const { ref, inView } = useInView();

  // Default endpoint for fetching heroes data
  const defaultEndPoint = `${STAR_WARS_API_BASE_URL}people/`;

  // Use infinite query to fetch heroes data with pagination support
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ApiResponse, Error>({
      queryKey: ["heroes"],
      queryFn: async ({ pageParam = defaultEndPoint }) =>
        await getHeroesListPages(pageParam as string),
      initialPageParam: defaultEndPoint,
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      staleTime: 1e6,
    });

  // Function to fetch the next page of data
  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Effect to fetch the next page when the component is in view
  useEffect(() => {
    if (inView && hasNextPage) {
      handleFetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, handleFetchNextPage]);

  // Flatten all pages into a single array of heroes
  const allHeroes = data?.pages.flatMap((page) => page.results) || [];

  return (
    <Box p="4">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="8">
        {allHeroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </SimpleGrid>
      <Loader isVisible={hasNextPage && !isFetchingNextPage} ref={ref} />
    </Box>
  );
}
