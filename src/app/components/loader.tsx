import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

// Define the props interface for the Loader component
export interface LoaderProps {
  isVisible: boolean;
}

// Loader component to display a spinner when loading
const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ isVisible }, ref) => {
    return (
      <>
        {/* Conditionally render the loader based on the isVisible prop */}
        {isVisible && (
          <Box ref={ref} display="flex" justifyContent="center" mt={4}>
            <Spinner size="lg" color="#ff6b0a" />
          </Box>
        )}
      </>
    );
  }
);

export default Loader;
