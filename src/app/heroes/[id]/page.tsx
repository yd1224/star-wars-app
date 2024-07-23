import HeroDetails from "@/app/components/hero-details";
import { getHeroDataDetails } from "@/lib/api";
import getQueryClient from "@/lib/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export interface HeroPageProps {
  params: {
    id: string;
  };
}

export default async function HeroPage({ params }: HeroPageProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["heroData", params.id],
    queryFn: () => getHeroDataDetails(Number.parseInt(params.id)),
    staleTime: 1e6,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HeroDetails heroId={params.id} />
    </HydrationBoundary>
  );
}
