import { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";

import dashboardIcon from "@/assets/dashboard-svgrepo-com.svg";
import calendarIcon from "@/assets/calendar-svgrepo-com.svg";
import pomodoroIcon from "@/assets/clock-circle-svgrepo-com.svg";
import chatIcon from "@/assets/chat-round-line-svgrepo-com.svg";
import rankIcon from "@/assets/ranking-1-svgrepo-com.svg";
import editUserIcon from "@/assets/user-rounded-svgrepo-com.svg";
import logoIcon from "@/assets/TaskRacerLogo.ico";
const getImage = () => ({
  height: "40px",
  width: "40px",
});

const menuItems = [
  { id: "dashboard", route: "/home", icon: dashboardIcon, page: "dashboard" },
  {
    id: "calendar",
    route: "/home/calendar",
    icon: calendarIcon,
    page: "calendar",
  },
  {
    id: "pomodoro",
    route: "/home/pomodoro",
    icon: pomodoroIcon,
    page: "pomodoro",
  },
  { id: "chat", route: "/home/chat", icon: chatIcon },
  { id: "rank", route: "/home/ranking", icon: rankIcon },
  {
    id: "edit-user",
    route: "/home/profile",
    icon: editUserIcon,
    page: "profile",
  },
];

export default function Sidebar() {
  const drawerWidth = 82;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const currentIndex = menuItems.findIndex(
      (item) => item.route === location.pathname,
    );
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
    }
  }, [location.pathname]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#FFF2F2",
          border: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          pt: 3,
        },
      }}
    >
      <Box sx={{ pl: 2 }}>
        <img src={logoIcon} alt="logo" />
      </Box>
      <List
        sx={{
          width: "100%",
          pl: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {menuItems.map((item, index) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ display: "block", mb: 5 }}
          >
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => {
                setSelectedIndex(index);
                navigate(item.route);
                if (item.page) dispatch(setPage(item.page));
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
                <img src={item.icon} alt={item.id} style={getImage()} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
