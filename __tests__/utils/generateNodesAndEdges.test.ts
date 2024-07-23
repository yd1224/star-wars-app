import { generateNodesAndEdges } from "@/lib/utils/generateNodesAndEdges";
import { HeroData } from "@/lib/types";

describe("generateNodesAndEdges", () => {
  // Test case 1: Basic scenario with one hero, one film, and one starship
  it("should generate nodes and edges correctly for a basic scenario", () => {
    const data: HeroData = {
      hero: { id: 1, name: "Hero A" },
      films: [{ id: 1, title: "Film A" }],
      starships: [{ id: 1, name: "Starship A", films: [1] }],
    };

    const { nodes, edges } = generateNodesAndEdges(data);

    expect(nodes).toEqual([
      {
        id: "hero-1",
        type: "mindmap",
        data: { label: "Hero A", imageType: "hero" },
        position: { x: 380, y: 50 }, // Updated position
      },
      {
        id: "film-1",
        type: "mindmap",
        data: { label: "Film A", imageType: "film" },
        position: { x: 380, y: 500 }, // Updated position
      },
      {
        id: "starship-1",
        type: "mindmap",
        data: { label: "Starship A", imageType: "starship" },
        position: { x: 380, y: 1000 }, // Updated position
      },
    ]);

    expect(edges).toEqual([
      {
        id: "hero-film-1",
        source: "hero-1",
        target: "film-1",
        type: "mindmap",
      },
      {
        id: "film-starship-1-1",
        source: "film-1",
        target: "starship-1",
        type: "mindmap",
      },
    ]);
  });

  // Test case 2: No films or starships
  it("should handle cases with no films or starships", () => {
    const data: HeroData = {
      hero: { id: 1, name: "Hero B" },
      films: [],
      starships: [],
    };

    const { nodes, edges } = generateNodesAndEdges(data);

    expect(nodes).toEqual([
      {
        id: "hero-1",
        type: "mindmap",
        data: { label: "Hero B", imageType: "hero" },
        position: { x: 190, y: 50 },
      },
    ]);

    expect(edges).toEqual([]);
  });

  // Test case 3: Multiple films and starships
  it("should handle multiple films and starships", () => {
    const data: HeroData = {
      hero: { id: 1, name: "Hero C" },
      films: [
        { id: 1, title: "Film B" },
        { id: 2, title: "Film C" },
      ],
      starships: [
        { id: 1, name: "Starship B", films: [1] },
        { id: 2, name: "Starship C", films: [2] },
      ],
    };

    const { nodes, edges } = generateNodesAndEdges(data);

    expect(nodes).toEqual([
      {
        id: "hero-1",
        type: "mindmap",
        data: { label: "Hero C", imageType: "hero" },
        position: { x: 570, y: 50 },
      },
      {
        id: "film-1",
        type: "mindmap",
        data: { label: "Film B", imageType: "film" },
        position: { x: 380, y: 500 },
      },
      {
        id: "starship-1",
        type: "mindmap",
        data: { label: "Starship B", imageType: "starship" },
        position: { x: 380, y: 1000 },
      },
      {
        id: "film-2",
        type: "mindmap",
        data: { label: "Film C", imageType: "film" },
        position: { x: 760, y: 500 },
      },
      {
        id: "starship-2",
        type: "mindmap",
        data: { label: "Starship C", imageType: "starship" },
        position: { x: 970, y: 1000 },
      },
    ]);

    expect(edges).toEqual([
      {
        id: "hero-film-1",
        source: "hero-1",
        target: "film-1",
        type: "mindmap",
      },
      {
        id: "film-starship-1-1",
        source: "film-1",
        target: "starship-1",
        type: "mindmap",
      },
      {
        id: "hero-film-2",
        source: "hero-1",
        target: "film-2",
        type: "mindmap",
      },
      {
        id: "film-starship-2-2",
        source: "film-2",
        target: "starship-2",
        type: "mindmap",
      },
    ]);
  });
});
