import { CssVarsThemeOptions } from "@mui/joy";

declare module "@mui/joy/Input" {
  interface InputPropsVariantOverrides {
    noborder: true;
  }
}

export const getInput = (): CssVarsThemeOptions["components"] => {
  return {
    JoyInput: {
      styleOverrides: {
        input: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "noborder" && {
            "background-color": "transparent !important",
          }),
        }),
        root: {
          minHeight: "1.5rem",
          background: "transparent",
          outline: "none",
          boxShadow: "none !important",
          "::before": {
            "background-color": "transparent !important",
            boxShadow: "none !important",
          },
        },
      },
    },
  };
};
