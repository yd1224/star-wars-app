"use client";

import React from "react";
import { Box, Text, ChakraProvider, Heading } from "@chakra-ui/react";
import { theme } from "../../../../theme";
import BackButton from "@/app/components/button";

// NotFound component to display a 404 error page when content is not found
export default function NotFound() {
  return (
    <ChakraProvider theme={theme}>
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
        <BackButton url="/" label="Back to Heroes" size="lg" />
      </Box>
    </ChakraProvider>
  );
}
