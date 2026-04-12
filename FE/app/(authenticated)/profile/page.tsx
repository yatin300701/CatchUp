"use client";

import Header from "@/components/common/Header";
import { AccountCircleOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/joy";

const ProfilePage = () => {
  return (
    <Box>
      <Header>
        <Typography level="title-md" sx={{ color: "white" }}>
          Profile
        </Typography>
      </Header>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={4}
      >
        <AccountCircleOutlined sx={{ width: 80, height: 80, color: "white" }} />
        <Typography level="title-lg" sx={{ color: "white" }}>
          Your Profile
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfilePage;
