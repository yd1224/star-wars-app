import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import "@testing-library/jest-dom";
import HeroesList from "@/app/components/heroes-list";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

jest.mock("@/app/components/hero-card.tsx", () => {
  return function HeroCardMock({ hero }: { hero: { name: string } }) {
    return <div data-testid="hero-card">{hero.name}</div>;
  };
});

jest.mock("@/app/components/loader.tsx", () => {
  return React.forwardRef<HTMLDivElement, { isVisible: boolean }>(
    ({ isVisible }, ref) => (
      <div
        data-testid="loader"
        ref={ref}
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        Loader
      </div>
    )
  );
});

describe("HeroesList Component", () => {
  const mockHeroes = [
    { id: 1, name: "Luke Skywalker" },
    { id: 2, name: "Darth Vader" },
    { id: 3, name: "Leia Organa" },
  ];

  const mockUseInfiniteQuery = (overrides = {}) => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [{ results: mockHeroes }],
      },
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      ...overrides,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the HeroesList component", () => {
    mockUseInfiniteQuery();
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<HeroesList />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("displays a list of hero cards", async () => {
    mockUseInfiniteQuery();
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<HeroesList />);

    const heroCards = await screen.findAllByTestId("hero-card");
    expect(heroCards).toHaveLength(mockHeroes.length);
    mockHeroes.forEach((hero) => {
      expect(screen.getByText(hero.name)).toBeInTheDocument();
    });
  });

  test("loads more heroes when in view", async () => {
    const fetchNextPageMock = jest.fn();
    mockUseInfiniteQuery({
      fetchNextPage: fetchNextPageMock,
    });
    const refMock = jest.fn();
    (useInView as jest.Mock).mockReturnValue({
      ref: refMock,
      inView: true,
    });

    render(<HeroesList />);

    await waitFor(() => expect(fetchNextPageMock).toHaveBeenCalled());
  });

  test("does not fetch next page if already fetching", async () => {
    const fetchNextPageMock = jest.fn();
    mockUseInfiniteQuery({
      isFetchingNextPage: true,
      fetchNextPage: fetchNextPageMock,
    });
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    render(<HeroesList />);

    await waitFor(() => expect(fetchNextPageMock).not.toHaveBeenCalled());
  });

  test("hides loader when no more pages to fetch", async () => {
    mockUseInfiniteQuery({
      hasNextPage: false,
    });
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    render(<HeroesList />);

    const loader = screen.getByTestId("loader");
    expect(loader).toHaveStyle("visibility: hidden");
  });

  test("shows loader when fetching next page", async () => {
    mockUseInfiniteQuery({
      isFetchingNextPage: true,
    });
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    render(<HeroesList />);

    const loader = screen.getByTestId("loader");
    expect(loader).toHaveStyle("visibility: hidden");
  });
});
