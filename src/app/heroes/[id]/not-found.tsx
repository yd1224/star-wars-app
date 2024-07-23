"use client";

import React from "react";
import Link from "next/link";
import { Box, Text, ChakraProvider, Heading, Button } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="gray.100"
        textAlign="center"
        backgroundColor={"#242424"}
        p={4}
      >
        <Heading as="h1" size="4xl" color="orange" mb={4}>
          404
        </Heading>
        <Text fontSize="2xl" fontWeight="bold" mb={4} color={"white"}>
          Could not find the hero
        </Text>
        <Link href="/">
          <Button colorScheme="orange" size="lg">
            Back to heroes
          </Button>
        </Link>
      </Box>
    </ChakraProvider>
  );
}
