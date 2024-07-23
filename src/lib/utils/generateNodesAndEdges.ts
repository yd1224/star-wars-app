import { Edge, HeroData } from "../types";

/**
 * Generates nodes and edges for a mindmap based on the provided hero data.
 * @param data - The hero data containing information about the hero, films, and starships.
 * @returns An object containing arrays of nodes and edges for the mindmap.
 */
export const generateNodesAndEdges = (data: HeroData) => {
  const nodes = []; // Array to hold the nodes for the mindmap
  const edges: Edge[] = []; // Array to hold the edges connecting the nodes

  // Create a node for the hero
  nodes.push({
    id: `hero-${data.hero.id}`, // Unique ID for the hero node
    type: "mindmap", // Type of node
    data: { label: data.hero.name, imageType: "hero" }, // Data to display for the hero
    position: { x: (380 * (data.films.length + 1)) / 2, y: 50 }, // Position of the hero node
  });

  // Iterate over each film to create film nodes and edges
  data.films.forEach((film, index) => {
    const filmNodeId = `film-${film.id}`; // Unique ID for the film node
    nodes.push({
      id: filmNodeId,
      type: "mindmap",
      data: { label: film.title, imageType: "film" }, // Data to display for the film
      position: { x: 380 * (index + 1), y: 500 }, // Position of the film node
    });

    // Create an edge connecting the hero node to the film node
    edges.push({
      id: `hero-film-${film.id}`, // Unique ID for the edge
      source: `hero-${data.hero.id}`, // Source node ID (hero)
      target: filmNodeId, // Target node ID (film)
      type: "mindmap", // Type of edge
    });

    // Iterate over each starship to create starship nodes and edges if the starship is in the film
    data.starships.forEach((starship, starshipIndex) => {
      if (starship.films && starship.films.includes(film.id)) {
        const starshipNodeId = `starship-${starship.id}`; // Unique ID for the starship node
        nodes.push({
          id: starshipNodeId,
          type: "mindmap",
          data: { label: starship.name, imageType: "starship" }, // Data to display for the starship
          position: {
            x: 190 * (film.id + 1) + 400 * starshipIndex, // Position of the starship node
            y: 1000, // Y-coordinate for the starship node
          },
        });

        // Create an edge connecting the film node to the starship node
        edges.push({
          id: `film-starship-${film.id}-${starship.id}`, // Unique ID for the edge
          source: filmNodeId, // Source node ID (film)
          target: starshipNodeId, // Target node ID (starship)
          type: "mindmap", // Type of edge
        });
      }
    });
  });

  // Return the arrays of nodes and edges
  return { nodes, edges };
};
