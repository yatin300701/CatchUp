import { AccountCircleOutlined } from "@mui/icons-material";
import { Box } from "@mui/joy";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display="flex"
      justifyContent="right"
      alignItems="center"
      gap="1rem"
      py={1.5}
      px={2}
      borderBottom="1px solid #2A2A2A"
      color="white"
    >
      {children}
      <AccountCircleOutlined sx={{ width: 22, height: 22, color: "white" }} />
    </Box>
  );
};

export default Header;
