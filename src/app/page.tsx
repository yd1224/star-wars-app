import { Container, Text } from "@chakra-ui/react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getHeroesListPages, STAR_WARS_API_BASE_URL } from "@/lib/api";
import getQueryClient from "@/lib/utils/getQueryClient";
import HeroesList from "./components/heroes-list";
import { ApiResponse } from "@/lib/types";

export default async function HeroesPage() {
  const queryClient = getQueryClient();

  const defaultEndpoint = `${STAR_WARS_API_BASE_URL}people/`;

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["heroes"],
    queryFn: async ({ pageParam = defaultEndpoint }) =>
      await getHeroesListPages(pageParam as string),
    initialPageParam: defaultEndpoint,
    getNextPageParam: (lastPage: ApiResponse) => lastPage.next || undefined,
    staleTime: 10 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Container maxW="container.lg" pb={10} pt={18} w="85%">
      <Text color="white" fontSize="2xl" fontWeight="bold" mb={4}>
        Star Wars Heroes
      </Text>
      <HydrationBoundary state={dehydratedState}>
        <HeroesList />
      </HydrationBoundary>
    </Container>
  );
}
