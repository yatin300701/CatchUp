import { CssVarsThemeOptions } from "@mui/joy";

export const getAspectRatio = (): CssVarsThemeOptions["components"] => {
  return {
    JoyAspectRatio: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {};
        },
      },
    },
  };
};
