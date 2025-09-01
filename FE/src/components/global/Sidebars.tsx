import logo from "@/assets/catchup.png";
import { List, Home, Sun, Moon } from "lucide-react";

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
import { type Dispatch, type SetStateAction } from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Explore",
    url: "#",
    icon: List,
    disable: true,
  },
];

type Props = {
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
};
export function AppSidebar({ theme, setTheme }: Props) {
  return (
    <Sidebar>
      <SidebarHeader className="m-3 ">
        <img src={logo} width={100} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild disabled={item.disable}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.disable && (
                        <span className="font-extralight">(WIP)</span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-center">
        {theme == "light" ? (
          <Sun color="orange" onClick={() => setTheme("dark")} />
        ) : (
          <Moon color="white" onClick={() => setTheme("light")} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
