const BATCH_SIZE = 5; // Number of items to process in each batch

/**
 * Fetches items in batches to optimize network requests and handle failures gracefully.
 * @param items - An array of item IDs to be fetched.
 * @param fetchFunction - A function that takes an item ID and returns a promise for fetching the item.
 * @returns A promise that resolves to an array of successfully fetched items.
 */
export const fetchInBatches = async <T>(
  items: number[],
  fetchFunction: (id: number) => Promise<T>
): Promise<T[]> => {
  const results: T[] = []; // Array to store the results of fetched items

  // Process the items array in chunks (batches) of size BATCH_SIZE
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    // Get the current batch of items
    const batch = items.slice(i, i + BATCH_SIZE);

    // Fetch all items in the current batch concurrently
    const batchResults = await Promise.allSettled(
      batch.map((itemId) => fetchFunction(itemId)) // Map each item ID to a fetch promise
    );

    // Process each result from the batch
    batchResults.forEach((result, index) => {
      if (result.status === "fulfilled") {
        results.push(result.value);
      } else {
        console.error(
          `Failed to fetch item with id ${batch[index]}: ${result.reason}`
        );
      }
    });
  }

  // Return the array of successfully fetched items
  return results;
};
