import { extendTheme } from "@mui/joy/styles";
import { colors } from "./components/colors";
import { getCheckbox } from "./components/checkbox";
import { getInput } from "./components/input";

export const theme = extendTheme({
  colorSchemes: colors,
  components: {
    ...getCheckbox(),
    ...getInput(),
  },
});
