"use client";

import React, { useEffect } from "react";
import {
  ReactFlow,
  Panel,
  ReactFlowProvider,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MindMapNode from "./mind-map-node";
import MindMapEdge from "./mind-map-edge";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getHeroDataDetails, getSpeciesData } from "@/lib/api";
import { generateNodesAndEdges } from "@/lib/utils/generateNodesAndEdges";
import { notFound } from "next/navigation";
import Loader from "./loader";
import HeroParams from "./hero-params";
import { Box } from "@chakra-ui/react";
import BackButton from "./button";

// Define custom node and edge types for the React Flow diagram
const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

// Define styles for the connection lines between nodes
const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };

// Define default options for edges
const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

// Flow component to render the mind map and hero details
function Flow({ heroId }: { heroId: string }) {
  // Convert heroId to number and check for validity
  const id = Number.parseInt(heroId);

  useEffect(() => {
    if (Number.isNaN(id)) {
      notFound(); // Redirect to 404 page if the id is invalid
    }
  }, [heroId]);

  // Fetch hero data using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ["heroData", id],
    queryFn: async () => await getHeroDataDetails(id),
    staleTime: 1e6,
  });

  // Redirect to 404 page if data is not found or an error occurs
  if (!data || !data.hero || !data?.hero?.species || error) {
    notFound();
  }

  // Create queries for fetching species data based on hero's species IDs
  const speciesQueries = data?.hero?.species
    ? data?.hero?.species.map((speciesId) => ({
        queryKey: ["species", speciesId],
        queryFn: async () => await getSpeciesData(speciesId),
        staleTime: 1e6, // Data freshness time (in milliseconds)
      }))
    : [];

  // Fetch species data using react-query
  const speciesResults = useQueries({ queries: speciesQueries });

  // Generate nodes and edges for the mind map diagram
  const { nodes, edges } = generateNodesAndEdges(data);

  return (
    <Box width={"100%"} height={"100vh"}>
      {/* Display loader while data is being fetched */}
      <Loader isVisible={isLoading} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.Straight}
        fitView
      >
        {/* Panel displaying hero and species details */}
        <Panel position="top-left" style={{ color: "#cdcdcd" }}>
          {data?.hero.name}
          <HeroParams
            label={"Birth Year"}
            value={data?.hero?.birth_year || "undefined"}
          />
          <HeroParams
            label={"Mass (kg)"}
            value={data?.hero?.mass || "undefined"}
          />
          <HeroParams
            label={"Height (cm)"}
            value={data?.hero?.height || "undefined"}
          />
          <HeroParams
            label={"Gender"}
            value={data?.hero?.gender || "undefined"}
          />
          {speciesResults &&
            speciesResults.map(
              (species) =>
                species.data && (
                  <Box key={species.data.name} paddingBottom={3}>
                    <HeroParams label={"Species"} value={species.data.name} />
                    <HeroParams
                      label={"Classification"}
                      value={species.data.classification}
                    />
                    <HeroParams
                      label={"Language"}
                      value={species.data.language}
                    />
                  </Box>
                )
            )}
          <BackButton url="/" label="Back to Heroes" size="sm" />
        </Panel>
      </ReactFlow>
    </Box>
  );
}

// Default export for the Flow component wrapped with ReactFlowProvider
export default ({ heroId }: { heroId: string }) => {
  return (
    <ReactFlowProvider>
      <Flow heroId={heroId} />
    </ReactFlowProvider>
  );
};
