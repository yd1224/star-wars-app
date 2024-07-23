import { fetchInBatches } from "@/lib/utils/fetchInBatches";

const mockFetchFunction = jest.fn();
const originalConsoleError = console.error;

describe("fetchInBatches", () => {
  beforeEach(() => {
    mockFetchFunction.mockClear();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("should fetch all items successfully in batches", async () => {
    mockFetchFunction.mockImplementation((id: number) =>
      Promise.resolve(`Item ${id}`)
    );

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = await fetchInBatches(items, mockFetchFunction);

    expect(results).toEqual(items.map((id) => `Item ${id}`));
    expect(mockFetchFunction).toHaveBeenCalledTimes(items.length);
  });

  it("should handle fetch function failures gracefully", async () => {
    mockFetchFunction.mockImplementation((id: number) =>
      id % 2 === 0
        ? Promise.resolve(`Item ${id}`)
        : Promise.reject(new Error(`Error fetching item ${id}`))
    );

    const items = [1, 2, 3, 4, 5];
    const results = await fetchInBatches(items, mockFetchFunction);

    expect(results).toEqual(["Item 2", "Item 4"]);
    expect(mockFetchFunction).toHaveBeenCalledTimes(items.length);
  });

  it("should handle empty input array", async () => {
    const items: number[] = [];
    const results = await fetchInBatches(items, mockFetchFunction);

    expect(results).toEqual([]);
    expect(mockFetchFunction).not.toHaveBeenCalled();
  });

  it("should handle a single batch of items", async () => {
    const items = [1, 2, 3, 4, 5];
    mockFetchFunction.mockImplementation((id: number) =>
      Promise.resolve(`Item ${id}`)
    );

    const results = await fetchInBatches(items, mockFetchFunction);

    expect(results).toEqual(items.map((id) => `Item ${id}`));
    expect(mockFetchFunction).toHaveBeenCalledTimes(items.length);
  });

  it("should handle multiple batches correctly", async () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    mockFetchFunction.mockImplementation((id: number) =>
      Promise.resolve(`Item ${id}`)
    );

    const results = await fetchInBatches(items, mockFetchFunction);

    expect(results).toEqual(items.map((id) => `Item ${id}`));
    expect(mockFetchFunction).toHaveBeenCalledTimes(items.length);
  });
});
