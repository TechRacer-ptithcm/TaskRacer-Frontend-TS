import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useAppDispatch } from "@/redux/store";
import { setPage } from "@/redux/page/pageSlice";
import logo from "@/assets/TaskRacerLogo.png";

// Navigation icons
const icons = [
  {
    id: "dashboard",
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z" />
      </svg>
    ),
  },
  {
    id: "calendar",
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5z" />
      </svg>
    ),
  },
  {
    id: "pomodoro",
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13-4-2.5V7h2v4.15l3 1.85-1 1.5z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const drawerWidth = 72;
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#faf7f7",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 2,
          },
        }}
      >
        <Box sx={{ mb: 4 }}>
          <img src={logo} alt="TaskRacer Logo" className="h-10 w-auto" />{" "}
        </Box>
        <List sx={{ width: "100%" }}>
          {icons.map((Icon, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block", mb: 2 }}
            >
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                  dispatch(
                    setPage(
                      icons[index].id as "calendar" | "dashboard" | "pomodoro",
                    ),
                  );
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  borderRadius: "50%",
                  mx: "auto",
                  width: 48,
                  height: 48,
                  "&.Mui-selected": {
                    bgcolor: "#e3f2fd",
                    color: "#1976d2",
                    boxShadow: "0 4px 8px rgba(25, 118, 210, 0.2)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    color: selectedIndex === index ? "#2196f3" : "inherit",
                  }}
                >
                  <Icon.icon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
