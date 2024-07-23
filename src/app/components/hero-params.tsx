import { Text } from "@chakra-ui/react";

// Define the props interface for the HeroParams component
export interface HeroParamsProps {
  label: string;
  value: string;
}

// HeroParams component to display a labeled value with custom styling
export default function HeroParams({ label, value }: HeroParamsProps) {
  return (
    <Text fontWeight={450} mt="2">
      {label}:
      <Text as="span" color="#ff6b0a" ml="1" fontWeight={450}>
        {value}
      </Text>
    </Text>
  );
}
