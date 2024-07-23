import React from "react";
import { Box, Text, Link, Badge, Flex, Image } from "@chakra-ui/react";
import HeroParams from "./hero-params";
import { Hero } from "@/lib/types";

export interface HeroCardProps {
  hero: Hero;
}

export default function HeroCard({ hero }: HeroCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      bgColor="white"
    >
      <Flex justifyContent="space-between" alignItems="baseline">
        <Text fontSize="m" fontWeight="bold">
          {hero.name}
        </Text>
        <Badge borderRadius="full" px="2" colorScheme="orange">
          {hero.gender}
        </Badge>
      </Flex>
      <Flex justifyContent="space-between">
        <Box>
          <HeroParams label="Height (cm)" value={hero.height} />
          <HeroParams label="Mass (kg)" value={hero.mass} />
          <HeroParams label="Birth Year" value={hero.birth_year} />
        </Box>
        <Link
          href={`/heroes/${hero.id}`}
          alignSelf="flex-end"
          _hover={{
            img: {
              transform: "scale(1.2)",
            },
          }}
          sx={{
            img: {
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          <Image
            boxSize={30}
            alignSelf="flex-end"
            src="/icons/arrow-icon.svg"
          />
        </Link>
      </Flex>
    </Box>
  );
}
