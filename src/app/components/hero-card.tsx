import React from "react";
import { Box, Text, Link, Badge, Flex, Image } from "@chakra-ui/react";
import HeroParams from "./hero-params";
import { Hero } from "@/lib/types";

// Define the props interface for the HeroCard component
export interface HeroCardProps {
  hero: Hero;
}

// HeroCard component to display information about a hero
export default function HeroCard({ hero }: HeroCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      bgColor="white"
    >
      {/* Header section displaying hero's name and gender */}
      <Flex justifyContent="space-between" alignItems="baseline">
        <Text fontSize="m" fontWeight="bold">
          {hero.name}
        </Text>
        <Badge borderRadius="full" px="2" colorScheme="orange">
          {hero.gender}
        </Badge>
      </Flex>

      {/* Main content section displaying hero's attributes */}
      <Flex justifyContent="space-between">
        <Box>
          {/* Display hero parameters using HeroParams component */}
          <HeroParams label="Height (cm)" value={hero.height ?? "undefined"} />
          <HeroParams label="Mass (kg)" value={hero.mass ?? "undefined"} />
          <HeroParams
            label="Birth Year"
            value={hero.birth_year ?? "undefined"}
          />
        </Box>

        {/* Link to hero's detailed page with an icon */}
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
            alt="Arrow icon"
          />
        </Link>
      </Flex>
    </Box>
  );
}
