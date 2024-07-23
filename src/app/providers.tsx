"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => new QueryClient(), []);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={client}>
        {children} <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
