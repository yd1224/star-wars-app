"use client";
import React from "react";
import {
  ReactFlow,
  Controls,
  Panel,
  ReactFlowProvider,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MindMapNode from "./MindMapNode";
import MindMapEdge from "./MindMapEdge";
import styles from "./index.module.css";
import { useQuery } from "@tanstack/react-query";
import { HeroData } from "@/lib/types";
import { getHeroDataDetails } from "@/lib/api";
import { Anybody } from "next/font/google";

const generateNodesAndEdges = (data: HeroData) => {
  const nodes = [];
  const edges: any[] = [];

  // Add hero node
  nodes.push({
    id: `hero-${data.hero.id}`,
    type: "mindmap",
    data: { label: data.hero.name, imageType: "hero" },
    position: { x: (380 * (data.films.length + 1)) / 2, y: 50 },
    className: "mindmap-node",
  });

  // Add film nodes and edges from hero to films
  data.films.forEach((film, index) => {
    const filmNodeId = `film-${film.id}`;
    nodes.push({
      id: filmNodeId,
      type: "mindmap",
      data: { label: film.title, imageType: "film" },
      position: { x: 380 * (index + 1), y: 500 },
      className: "mindmap-node",
    });

    edges.push({
      id: `hero-film-${film.id}`,
      source: `hero-${data.hero.id}`,
      target: filmNodeId,
      type: "mindmap",
      className: "mindmap-edge",
    });

    // Add starship nodes and edges from films to starships
    data.starships.forEach((starship, starshipIndex) => {
      if (starship.films.includes(film.id)) {
        const starshipNodeId = `starship-${starship.id}`;
        nodes.push({
          id: starshipNodeId,
          type: "mindmap",
          data: { label: starship.name, imageType: "starship" },
          position: {
            x: 190 * (film.id + 1) + 400 * starshipIndex,
            y: 1000,
          },
          className: "mindmap-node",
        });

        edges.push({
          id: `film-starship-${film.id}-${starship.id}`,
          source: filmNodeId,
          target: starshipNodeId,
          type: "mindmap",
          className: "mindmap-edge",
        });
      }
    });
  });

  return { nodes, edges };
};

const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

const nodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

function Flow({ heroId }: { heroId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["heroData", heroId],
    queryFn: async () => await getHeroDataDetails(Number.parseInt(heroId)),
    staleTime: 1e6,
  });
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data</div>;
  const { nodes, edges } = generateNodesAndEdges(data);

  return (
    <div className={styles.reactflowWrapper}>
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
        <Panel position="top-left" className={styles.header}>
          {data?.hero.name}
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default ({ heroId }: { heroId: string }) => {
  return (
    <ReactFlowProvider>
      <Flow heroId={heroId} />
    </ReactFlowProvider>
  );
};

//  const nodes = [
//    {
//      id: "root",
//      type: "mindmap",
//      data: { label: "React Flow" },
//      position: { x: 0, y: 0 },
//    },
//    {
//      id: "1",
//      type: "mindmap",
//      data: { label: "Website" },
//      position: { x: -20, y: -110 },
//      parentId: "root",
//    },
//    {
//      id: "1-1",
//      type: "mindmap",
//      data: { label: "Docs" },
//      position: { x: -40, y: -50 },
//      parentId: "1",
//    },
//    {
//      id: "1-2",
//      type: "mindmap",
//      data: { label: "Examples" },
//      position: { x: 60, y: -60 },
//      parentId: "1",
//    },
//    {
//      id: "2",
//      type: "mindmap",
//      data: { label: "Github" },
//      position: { x: -120, y: 80 },
//      parentId: "root",
//    },
//    {
//      id: "2-1",
//      type: "mindmap",
//      data: { label: "Issues" },
//      position: { x: -70, y: 10 },
//      parentId: "2",
//    },
//    {
//      id: "2-2",
//      type: "mindmap",
//      data: { label: "PRs" },
//      position: { x: -20, y: 50 },
//      parentId: "2",
//    },
//    {
//      id: "3",
//      type: "mindmap",
//      data: { label: "React Flow Pro" },
//      position: { x: 200, y: 70 },
//      parentId: "root",
//    },
//    {
//      id: "3-1",
//      type: "mindmap",
//      data: { label: "Pro Examples" },
//      position: { x: 80, y: 60 },
//      parentId: "3",
//    },
//  ];

//  const edges = [
//    {
//      id: "r-1",
//      source: "root",
//      target: "1",
//    },
//    {
//      id: "1-1",
//      source: "1",
//      target: "1-1",
//    },
//    {
//      id: "1-2",
//      source: "1",
//      target: "1-2",
//    },
//    {
//      id: "r-2",
//      source: "root",
//      target: "2",
//    },
//    {
//      id: "2-1",
//      source: "2",
//      target: "2-1",
//    },
//    {
//      id: "2-2",
//      source: "2",
//      target: "2-2",
//    },
//    {
//      id: "r-3",
//      source: "root",
//      target: "3",
//    },
//    {
//      id: "3-1",
//      source: "3",
//      target: "3-1",
//    },
//  ];
