import Sidebar from "@/components/common/sidebar";
import { Box } from "@mui/joy";

const SidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box display="flex" height="100vh" width="100vw">
      <Sidebar />
      <Box flex={1} overflow="auto" component="main">
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
