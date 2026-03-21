"use client";

import { AccountCircleOutlined, Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/joy";
import { useSidebar } from "@/app/(authenticated)/layout";

const Header = ({ children }: { children?: React.ReactNode }) => {
  const { open } = useSidebar();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="1rem"
      py={1.5}
      px={2}
      borderBottom="1px solid #2A2A2A"
      color="white"
    >
      <Box display="flex" alignItems="center" gap="1rem">
        <IconButton
          variant="plain"
          onClick={open}
          sx={{ display: { xs: "inline-flex", md: "none" }, color: "white" }}
        >
          <Menu />
        </IconButton>
        {children}
      </Box>
      <AccountCircleOutlined sx={{ width: 22, height: 22, color: "white" }} />
    </Box>
  );
};

export default Header;
