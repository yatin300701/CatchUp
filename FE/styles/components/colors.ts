import { ColorSystemOptions } from "@mui/joy/styles/extendTheme";
import { DefaultColorScheme } from "@mui/joy/styles/types";

export const colors:
  | Partial<Record<DefaultColorScheme, ColorSystemOptions>>
  | undefined = {
  dark: {
    palette: {
      primary: {
        50: "#FDF6F0",
        100: "#F5E6D8",
        200: "#EAC9AA",
        300: "#D4956A",
        400: "#C96442",
        500: "#C15F3C",
        600: "#A84F30",
        700: "#8C3E23",
        800: "#6E2E18",
        900: "#4A1D0C",

        solidBg: "#C15F3C",
        solidHoverBg: "#A84F30",
        solidActiveBg: "#8C3E23",
        solidColor: "#FFFFFF",

        plainColor: "#D4956A",
        plainHoverBg: "#2C2318",
      },
      text: {
        primary: "#F0EDE8",
        secondary: "#B5AFA8",
        tertiary: "#7D786F",
        icon: "#F0EDE8",
      },
      background: {
        body: "#1C1917",
        surface: "#231F1C",
        level1: "#2C2318",
        level2: "#332920",
        level3: "#3D3028",
      },
    },
  },
  light: {
    palette: {
      primary: {
        50: "#EAEAEA",
        100: "#CFCFCF",
        200: "#B3B3B3",
        300: "#8F8F8F",
        400: "#5F5F5F",
        500: "#303030",
        600: "#2C2C2C",
        700: "#1D1D1D",
        800: "#242424",
        900: "#0B0B0B",

        solidBg: "#303030",
        solidHoverBg: "#2C2C2C",
        solidActiveBg: "#1D1D1D",
        solidColor: "#FFFFFF",

        plainColor: "#CFCFCF",
        plainHoverBg: "#2A2A2A",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#CFCFCF",
        tertiary: "#B3B3B3",
        icon: "#FFFFFF",
      },
      background: {
        body: "#212121",
        surface: "#2A2A2A",
        level1: "#1D1D1D",
        level2: "#181818",
        level3: "#1E1E1E",
      },
    },
  },
};
