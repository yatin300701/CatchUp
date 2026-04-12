"use client";

import Sidebar from "@/components/common/sidebar";
import { Box } from "@mui/joy";
import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  open: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarLayout");
  }
  return context;
};

const SidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open: () => setIsSidebarOpen(true) }}>
      <Box display="flex" height="100vh" width="100vw" overflow="hidden">
        {isSidebarOpen && (
          <Box
            onClick={() => setIsSidebarOpen(false)}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              display: { xs: "block", md: "none" },
            }}
          />
        )}
        <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <Box
          flex={1}
          overflow="auto"
          component="main"
          sx={{ position: "relative" }}
        >
          <Box height="100%">{children}</Box>
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
};

export default SidebarLayout;
