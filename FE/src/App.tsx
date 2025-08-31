import { cn } from "@/lib/utils";
import { useState } from "react";
import { AppSidebar } from "./components/global/Sidebars";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/sonner";
import Home from "./pages/home";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <div
      className={cn(
        "bg-background text-foreground",
        theme == "light" ? "light" : "dark"
      )}
    >
      <SidebarProvider>
        <AppSidebar theme={theme} setTheme={setTheme} />
        <Home />
        <Toaster />
      </SidebarProvider>
    </div>
  );
}

export default App;
