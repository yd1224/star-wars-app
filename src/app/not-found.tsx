"use client";

import { Box, Text, ChakraProvider, Heading } from "@chakra-ui/react";

// Component to display a 404 error page when a page is not found
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
          This page could not be found
        </Text>
      </Box>
    </ChakraProvider>
  );
}
