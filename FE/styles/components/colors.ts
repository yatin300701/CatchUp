import { ColorSystemOptions } from "@mui/joy/styles/extendTheme";
import { DefaultColorScheme } from "@mui/joy/styles/types";

export const colors:
  | Partial<Record<DefaultColorScheme, ColorSystemOptions>>
  | undefined = {
  dark: {
    palette: {
      primary: {
        50: "#EAEAEA",
        100: "#CFCFCF",
        200: "#B3B3B3",
        300: "#8F8F8F",
        400: "#5F5F5F",
        500: "#212121",
        600: "#1D1D1D",
        700: "#181818",
        800: "#242424",
        900: "#0B0B0B",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#CFCFCF",
        tertiary: "#B3B3B3",
        icon: "#FFFFFF",
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
        level3: "#121212",
      },
    },
  },
};
