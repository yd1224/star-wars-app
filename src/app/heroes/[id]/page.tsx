import HeroGraphDetails from "@/app/components/hero-graph-details";
import { getHeroDataDetails, getSpeciesData } from "@/lib/api";
import { HeroData } from "@/lib/types";
import getQueryClient from "@/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// Define the props interface for the HeroPage component
export interface HeroPageProps {
  params: {
    id: string;
  };
}

// Server-side function to handle data fetching and prefetching for the hero page
export default async function HeroPage({ params }: HeroPageProps) {
  // Initialize the query client
  const queryClient = getQueryClient();

  const heroId = Number.parseInt(params.id); // Convert the hero ID to a number

  // Prefetch hero data using the hero ID
  await queryClient.prefetchQuery({
    queryKey: ["heroData", heroId],
    queryFn: () => getHeroDataDetails(heroId),
    staleTime: 1e6, // Set the stale time to 1 million milliseconds (approximately 11 days)
  });

  // Retrieve the pre-fetched hero data from the query client
  const heroData: HeroData | undefined = queryClient.getQueryData([
    "heroData",
    heroId,
  ]);

  // If hero data is available, prefetch species data for each species associated with the hero
  if (heroData?.hero.species) {
    await Promise.allSettled(
      heroData.hero.species.map((speciesId: number) =>
        queryClient.prefetchQuery({
          queryKey: ["species", speciesId],
          queryFn: () => getSpeciesData(speciesId),
          staleTime: 1e6, // Set the stale time to 1 million milliseconds (approximately 11 days)
        })
      )
    );
  }

  // Dehydrate the query client state for client-side hydration
  const dehydratedState = dehydrate(queryClient);

  // Render the HeroDetails component within a HydrationBoundary
  return (
    <HydrationBoundary state={dehydratedState}>
      <HeroGraphDetails heroId={params.id} />
    </HydrationBoundary>
  );
}
