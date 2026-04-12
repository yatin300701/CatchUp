import { CssVarsThemeOptions } from "@mui/joy";

export const getMenu = (): CssVarsThemeOptions["components"] => {
  return {
    JoyIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
  };
};
