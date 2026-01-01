import logo from "@/assets/catchup.png";
import {
  Sun,
  Moon,
  UserRoundCheck,
  Notebook,
  Flag,
  Camera,
  Landmark,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import type { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// Menu items.
const items = [
  {
    title: "Tasks",
    url: "/task",
    icon: UserRoundCheck,
  },
  {
    title: "Documents",
    url: "/document",
    icon: Notebook,
    disable: true,
  },
  {
    title: "Goals",
    url: "/goals",
    icon: Flag,
    disable: true,
  },
  {
    title: "Moments",
    url: "/moments",
    icon: Camera,
    disable: true,
  },
  {
    title: "Budget",
    url: "/budget",
    icon: Landmark,
    disable: true,
  },
];

type Props = {
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
};
export function AppSidebar({ theme, setTheme }: Props) {
  const pathname = useLocation();
  return (
    <Sidebar>
      <SidebarHeader className="m-3 ">
        <img src={logo} width={100} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="p-0 py-1">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="px-2 py-0.5">
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname.pathname === item.url ||
                      pathname.pathname.startsWith(item.url)
                    }
                  >
                    <Link to={item.url} className="px-3 h-9">
                      <item.icon
                        className={cn(
                          pathname.pathname === item.url && "fill-current",
                          "!size-5"
                        )}
                      />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-center">
        {theme === "light" ? (
          <Sun color="orange" onClick={() => setTheme("dark")} />
        ) : (
          <Moon color="white" onClick={() => setTheme("light")} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
