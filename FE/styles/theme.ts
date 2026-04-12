import { extendTheme } from "@mui/joy/styles";
import { colors } from "./components/colors";
import { getCheckbox } from "./components/checkbox";
import { getInput } from "./components/input";
import { getTypography } from "./components/typography";
import { getMenu } from "./components/menu";
import { getAspectRatio } from "./components/aspect-ratio";

export const theme = extendTheme({
  colorSchemes: colors,
  components: {
    ...getCheckbox(),
    ...getInput(),
    ...getTypography(),
    ...getMenu(),
    ...getAspectRatio(),
  },
});
