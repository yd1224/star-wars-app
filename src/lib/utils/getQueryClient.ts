import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";

// Creates and caches a new instance of QueryClient.
const getQueryClient = cache(() => new QueryClient()) as () => QueryClient;

export default getQueryClient;
