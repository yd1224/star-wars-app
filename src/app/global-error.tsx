"use client";

import { Box, Text, ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../theme";

// Component to display a global error message
export default function GlobalError() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="gray.100"
      >
        <Box
          p={8}
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          textAlign="center"
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Something went wrong
          </Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
