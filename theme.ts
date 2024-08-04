import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#242424",
      },
    },
  },
  breakpoints: {
    sm: "10em",
    md: "40em",
    lg: "62em",
    xl: "80em",
  },
});
