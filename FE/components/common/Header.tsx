"use client";

import { AccountCircleOutlined, Menu } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Dropdown,
  MenuButton,
  MenuItem,
  useTheme,
} from "@mui/joy";
import MuiMenu from "@mui/joy/Menu";
import { useSidebar } from "@/app/(authenticated)/layout";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const Header = ({ children }: { children?: React.ReactNode }) => {
  const theme = useTheme();
  const { open } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

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
      <Dropdown>
        <MenuButton
          sx={{
            minWidth: 0,
            minHeight: 0,
            p: 0,
          }}
        >
          <AccountCircleOutlined sx={{ width: 22, height: 22 }} />
        </MenuButton>
        <MuiMenu
          placement="bottom-end"
          sx={{
            borderRadius: "8px",
            minWidth: "140px",
            p: 0.5,
          }}
        >
          <MenuItem
            onClick={handleProfile}
            sx={{
              color: "primary.100",
              borderRadius: "6px",
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: theme.palette.danger[400],
              borderRadius: "6px",
              "&:hover": { color: theme.palette.danger[400] },
            }}
          >
            Logout
          </MenuItem>
        </MuiMenu>
      </Dropdown>
    </Box>
  );
};

export default Header;
