const BATCH_SIZE = 5;

export const fetchInBatches = async <T>(
  items: number[],
  fetchFunction: (id: number) => Promise<T>
): Promise<T[]> => {
  const results: T[] = [];

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.allSettled(
      batch.map((itemId) => fetchFunction(itemId))
    );

    batchResults.forEach((result) => {
      if (result.status === "fulfilled") {
        results.push(result.value);
      } else {
        console.error(
          `Failed to fetch item with id ${
            batch[batchResults.indexOf(result)]
          }: ${result.reason}`
        );
      }
    });
  }

  return results;
};
