"use client";

import { Box, Text, ChakraProvider } from "@chakra-ui/react";

export default function GlobalError() {
  return (
    <html>
      <body>
        <ChakraProvider>
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
      </body>
    </html>
  );
}
