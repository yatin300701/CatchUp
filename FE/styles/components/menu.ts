import { CssVarsThemeOptions } from "@mui/joy";

export const getMenu = (): CssVarsThemeOptions["components"] => {
  return {
    JoyMenu: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {
            backgroundColor: theme.palette.primary.solidBg,
            color: theme.palette.primary[100],
            border: "none",
          };
        },
      },
    },
    JoyMenuButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: "transparent",
          border: "none",

          "&:hover": {
            backgroundColor: "transparent",
          },
        }),
      },
    },
    JoyMenuItem: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {
            backgroundColor: theme.palette.primary.solidBg,
            '&:not(.Mui-selected, [aria-selected="true"]):hover': {
              backgroundColor: theme.palette.primary.solidHoverBg,
              color: "inherit",
            },
          };
        },
      },
    },
  };
};
