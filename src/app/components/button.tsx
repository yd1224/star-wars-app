import { Button, Link } from "@chakra-ui/react";
import React from "react";

interface BackButtonProps {
  url: string;
  label: string;
  size?: string;
}

// BackButton component to navigate back to the heroes page
export default function BackButton({ url, label, size }: BackButtonProps) {
  return (
    <Link href={url}>
      <Button colorScheme="orange" size={size}>
        {label}
      </Button>
    </Link>
  );
}
