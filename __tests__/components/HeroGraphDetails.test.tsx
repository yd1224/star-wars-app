import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useQuery, useQueries } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import HeroGraphDetails from "@/app/components/hero-graph-details";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useQueries: jest.fn(),
}));

jest.mock("@/lib/api", () => ({
  getHeroDataDetails: jest.fn(),
  getSpeciesData: jest.fn(),
}));

jest.mock("@/lib/utils/generateNodesAndEdges", () => ({
  generateNodesAndEdges: jest.fn().mockReturnValue({
    nodes: [],
    edges: [],
  }),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/app/components/mind-map-node", () => {
  return function MindMapNodeMock() {
    return <div data-testid="mindmap-node"></div>;
  };
});

jest.mock("@/app/components/mind-map-edge", () => {
  return function MindMapEdgeMock() {
    return <div data-testid="mindmap-edge"></div>;
  };
});

jest.mock("@/app/components/loader.tsx", () => {
  return function LoaderMock({ isVisible }: { isVisible: boolean }) {
    return <div data-testid="loader">{isVisible ? "Loading..." : ""}</div>;
  };
});

jest.mock("@/app/components/hero-params.tsx", () => {
  return function HeroParamsMock({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    return (
      <div data-testid="hero-params">
        {label}: {value}
      </div>
    );
  };
});

describe("HeroGraphDetails Component", () => {
  const mockHeroData = {
    hero: {
      name: "Luke Skywalker",
      birth_year: "19BBY",
      mass: "77",
      height: "172",
      gender: "male",
      species: [1],
    },
  };

  const mockSpeciesData = {
    name: "Human",
    classification: "Mammal",
    language: "Galactic Basic",
  };

  const mockUseQuery = (overrides = {}) => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockHeroData,
      isLoading: false,
      error: null,
      ...overrides,
    });
  };

  const mockUseQueries = (overrides: any[] = []) => {
    (useQueries as jest.Mock).mockReturnValue(
      overrides.map((override) => ({
        data: mockSpeciesData,
        isLoading: false,
        error: null,
        ...override,
      }))
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the HeroGraphDetails component with hero data", async () => {
    mockUseQuery({
      data: mockHeroData,
      isLoading: false,
      error: null,
    });

    mockUseQueries([
      {
        data: mockSpeciesData,
        isLoading: false,
        error: null,
      },
    ]);

    render(<HeroGraphDetails heroId="1" />);

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Birth Year: 19BBY")).toBeInTheDocument();
    expect(screen.getByText("Mass (kg): 77")).toBeInTheDocument();
    expect(screen.getByText("Height (cm): 172")).toBeInTheDocument();
    expect(screen.getByText("Gender: male")).toBeInTheDocument();

    expect(screen.getByText("Species: Human")).toBeInTheDocument();
    expect(screen.getByText("Classification: Mammal")).toBeInTheDocument();
    expect(screen.getByText("Language: Galactic Basic")).toBeInTheDocument();
  });

  test("renders loader while hero data is loading", () => {
    mockUseQuery({ isLoading: true });

    render(<HeroGraphDetails heroId="1" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("redirects to 404 page for invalid heroId", () => {
    const notFoundMock = require("next/navigation").notFound;

    render(<HeroGraphDetails heroId="invalid" />);

    expect(notFoundMock).toHaveBeenCalled();
  });

  test("redirects to 404 page when hero data is not found", () => {
    const notFoundMock = require("next/navigation").notFound;
    mockUseQuery({ data: null });

    render(<HeroGraphDetails heroId="1" />);

    expect(notFoundMock).toHaveBeenCalled();
  });

  test("handles errors when fetching hero data", () => {
    const notFoundMock = require("next/navigation").notFound;
    mockUseQuery({ error: new Error("Error fetching data") });

    render(<HeroGraphDetails heroId="1" />);

    expect(notFoundMock).toHaveBeenCalled();
  });

  test("handles error in species data fetch gracefully", async () => {
    mockUseQuery({
      data: {
        hero: {
          name: "Luke Skywalker",
          species: [1],
        },
      },
      isLoading: false,
      error: null,
    });

    mockUseQueries([
      {
        data: null,
        isLoading: false,
        error: new Error("Error fetching species data"),
      },
    ]);

    render(<HeroGraphDetails heroId="1" />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Species: Human")).not.toBeInTheDocument();
    });
  });

  test("handles empty hero data gracefully", async () => {
    mockUseQuery({
      data: { hero: {} },
      isLoading: false,
      error: null,
    });

    render(<HeroGraphDetails heroId="1" />);

    expect(screen.queryByText("Luke Skywalker")).not.toBeInTheDocument();
    expect(screen.queryByText("Birth Year: 19BBY")).not.toBeInTheDocument();
  });

  test("renders multiple species information", async () => {
    mockUseQuery({
      data: {
        hero: { name: "Luke Skywalker", species: [1, 2] },
      },
      isLoading: false,
      error: null,
    });

    mockUseQueries([
      {
        data: {
          name: "Human",
          classification: "Mammal",
          language: "Galactic Basic",
        },
        isLoading: false,
        error: null,
      },
      {
        data: {
          name: "Wookiee",
          classification: "Mammal",
          language: "Shyriiwook",
        },
        isLoading: false,
        error: null,
      },
    ]);

    render(<HeroGraphDetails heroId="1" />);

    expect(screen.getByText("Species: Human")).toBeInTheDocument();
    expect(screen.getByText("Species: Wookiee")).toBeInTheDocument();
  });

  test("handles loading species data gracefully", () => {
    mockUseQuery({
      data: {
        hero: { name: "Luke Skywalker", species: [1] },
      },
      isLoading: false,
      error: null,
    });

    mockUseQueries([{ data: null, isLoading: true, error: null }]);

    render(<HeroGraphDetails heroId="1" />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.queryByText("Species: Human")).not.toBeInTheDocument();
  });

  test("handles errors in multiple species queries gracefully", async () => {
    mockUseQuery({
      data: {
        hero: { name: "Luke Skywalker", species: [1, 2] },
      },
      isLoading: false,
      error: null,
    });

    mockUseQueries([
      {
        data: null,
        isLoading: false,
        error: new Error("Error fetching species 1"),
      },
      {
        data: null,
        isLoading: false,
        error: new Error("Error fetching species 2"),
      },
    ]);

    render(<HeroGraphDetails heroId="1" />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Species: Human")).not.toBeInTheDocument();
    });
  });
});
