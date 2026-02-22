import { CssVarsThemeOptions } from "@mui/joy";

declare module "@mui/joy/Checkbox" {
  interface CheckboxPropsVariantOverrides {
    rounded: true;
  }
}
export const getCheckbox = (): CssVarsThemeOptions["components"] => {
  return {
    JoyCheckbox: {
      styleOverrides: {
        checkbox: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "rounded" && {
            borderRadius: "50%",
          }),
          border: "none",
          ":hover": {
            backgroundColor: theme.vars.palette.primary[600],
            border: `1px solid ${theme.vars.palette.primary[100]}`,
          },
          ":active": {
            backgroundColor: theme.vars.palette.primary[300],
            border: `1px solid ${theme.vars.palette.primary[100]}`,
          },
          ".Mui-checked": {
            backgroundColor: theme.vars.palette.primary.solidColor,
            border: `1px solid ${theme.vars.palette.primary[100]}`,
          },
        }),
      },
    },
  };
};
