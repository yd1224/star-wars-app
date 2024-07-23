import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";
import styles from "./index.module.css";
import { Box, Image, Text } from "@chakra-ui/react";

export type NodeData = {
  label: string;
  imageType: string;
};

function MindMapNode({ id, data }: NodeProps<Node<NodeData>>) {
  const inputRef = useRef<HTMLInputElement>();
  //   const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${data.label.length * 8}px`;
    }
  }, [data.label.length]);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
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
        <Image src={`/icons/${data.imageType}.png`} boxSize={10}></Image>
        <Text>{data.label}</Text>
      </Box>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}

export default MindMapNode;
