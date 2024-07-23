import React from "react";
import { BaseEdge, EdgeProps, getStraightPath } from "@xyflow/react";

// Custom edge component for displaying straight lines between nodes in a mind map
function MindMapEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;

  // Calculate the path for a straight line edge, adjusting sourceY to create spacing
  const [edgePath] = getStraightPath({
    sourceX, // X coordinate of the source node
    sourceY: sourceY + 20, // Y coordinate of the source node, with additional offset for spacing
    targetX, // X coordinate of the target node
    targetY, // Y coordinate of the target node
  });

  // Render the BaseEdge component with the calculated path and other props
  return <BaseEdge path={edgePath} {...props} />;
}

export default MindMapEdge;
