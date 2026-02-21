"use client";
import { Box } from "@mui/joy";
import Image from "next/image";
import { FC } from "react";
import {
  Book,
  Calculate,
  PostAdd,
  TaskAlt,
  TrackChanges,
  Videocam,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {}

const sidebarItems = [
  {
    label: "Task",
    href: "/task",
    icon: <TaskAlt sx={{ width: 22, height: 22, color: "white" }} />,
  },
  {
    label: "Notes",
    href: "/notes",
    icon: <PostAdd sx={{ width: 22, height: 22, color: "white" }} />,
  },
  {
    label: "Upload Doc",
    href: "/upload-doc",
    icon: <Book sx={{ width: 22, height: 22, color: "white" }} />,
  },
  {
    label: "Goals",
    href: "/goals",
    icon: <TrackChanges sx={{ width: 22, height: 22, color: "white" }} />,
  },
  {
    label: "Budget",
    href: "/budget",
    icon: <Calculate sx={{ width: 22, height: 22, color: "white" }} />,
  },
  {
    label: "Memories",
    href: "/memories",
    icon: <Videocam sx={{ width: 22, height: 22, color: "white" }} />,
  },
];

const Sidebar: FC<SidebarProps> = () => {
  const pathname = usePathname();

  return (
    <Box
      width={250}
      height="100%"
      bgcolor="primary.700"
      display="flex"
      flexDirection="column"
      color="white"
      p={2}
    >
      <Image src="/catchuplogo.svg" alt="CatchUp" width={120} height={40} />
      <Box mt={2}>
        {sidebarItems.map((item) => {
          const isActive = (href: string) => pathname === href;
          return (
            <>
              <Link
                href={item.href}
                key={item.label}
                style={{ textDecoration: "none" }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  fontSize={16}
                  color="white"
                  bgcolor={isActive(item.href) ? "primary.600" : "transparent"}
                  my={2}
                  px={1.25}
                  py={1}
                  borderRadius={8}
                  sx={{
                    "&:hover": {
                      bgcolor: isActive(item.href)
                        ? "primary.600"
                        : "primary.800",
                    },
                    "&:active": {
                      bgcolor: "primary.500",
                    },
                  }}
                >
                  {item.icon}
                  {item.label}
                </Box>
              </Link>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
