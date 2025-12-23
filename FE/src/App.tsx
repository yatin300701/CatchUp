import { cn } from "@/lib/utils";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/global/Sidebars";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/home";
import Document from "./pages/document";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className={cn("bg-background text-foreground", theme)}>
      <BrowserRouter>
        <SidebarProvider>
          <AppSidebar theme={theme} setTheme={setTheme} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task" element={<Home />} />
            <Route path="/document" element={<Document />} />
          </Routes>

          <Toaster />
        </SidebarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
