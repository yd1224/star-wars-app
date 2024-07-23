import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";
import { Box, Image, Text } from "@chakra-ui/react";

// Define the data structure for the node
export type NodeData = {
  label: string;
  imageType: string;
};

// Custom node component for the mind map
function MindMapNode({ data }: NodeProps<Node<NodeData>>) {
  // Reference to the input element for dynamic width adjustment
  const inputRef = useRef<HTMLInputElement>(null);

  // Adjust the width of the input element based on the length of the label
  useLayoutEffect(() => {
    if (inputRef.current) {
      // Set width based on label length (approximated by multiplying length by 8 pixels per character)
      inputRef.current.style.width = `${data.label.length * 8}px`;
    }
  }, [data.label.length]);

  // Focus the input element after the component mounts
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true }); // Focus the input element, preventing scrolling
      }
    }, 1);
  }, []);

  return (
    <>
      <Box
        padding={5}
        border={"1px solid #000000"}
        borderRadius={8}
        backgroundColor={"white"}
        fontSize={20}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={2}
        textAlign={"center"}
        width={300}
      >
        <Image src={`/icons/${data.imageType}.png`} boxSize={10} />
        <Text>{data.label}</Text>
      </Box>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}

export default MindMapNode;
