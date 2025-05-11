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

import dashboardIcon from "@/assets/icons/navigation/dashboard-svgrepo-com.svg";
import calendarIcon from "@/assets/icons/navigation/calendar-svgrepo-com.svg";
import pomodoroIcon from "@/assets/icons/navigation/clock-circle-svgrepo-com.svg";
import chatIcon from "@/assets/icons/navigation/chat-round-line-svgrepo-com.svg";
import rankIcon from "@/assets/icons/navigation/ranking-1-svgrepo-com.svg";
import editUserIcon from "@/assets/icons/features/user-rounded-svgrepo-com.svg";
import logoIcon from "@/assets/images/logos/TaskRacerLogo.ico";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import teamIcon from "@/assets/icons/navigation/people-svgrepo-com.svg";

const getImage = () => ({
  height: "40px",
  width: "40px",
});

const menuItems = [
  { id: "dashboard", route: "/home", icon: dashboardIcon, page: "dashboard" },
  {
    id: "calendar",
    routes: ["/home/todo", "/home/calendar"],
    icon: calendarIcon,
    page: "calendar",
    currentPage: "calendar",
  },
  {
    id: "team",
    route: "/home/team",
    icon: teamIcon,
    page: "team",
  },
  {
    id: "pomodoro",
    route: "/home/pomodoro",
    icon: pomodoroIcon,
    page: "pomodoro",
  },
  {
    id: "chat",
    route: "/home/chat",
    icon: chatIcon,
    page: "chat" as const,
  },
  {
    id: "rank",
    route: "/home/ranking",
    icon: rankIcon,
    page: "ranking",
  },
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

  const selectedViewPage = useSelector(
    (state: RootState) => state.viewMode.selectedViewPage,
  );
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  const [selectedId, setSelectedId] = useState<string>("dashboard");

  useEffect(() => {
    // Đồng bộ selectedId với currentPage từ Redux store
    const currentPath = location.pathname;
    const menuItem = menuItems.find((item) => {
      if (item.routes) {
        return item.routes.includes(currentPath);
      }
      return item.route === currentPath;
    });

    if (menuItem) {
      setSelectedId(menuItem.id);
    }
  }, [location.pathname, currentPage]);

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
        {menuItems.map(
          (
            item,
            _index, // Changed index to _index
          ) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{ display: "block", mb: 5 }}
            >
              <ListItemButton
                selected={item.id === selectedId}
                onClick={() => {
                  setSelectedId(item.id);
                  if (item.id === "calendar") {
                    const nextRoute =
                      selectedViewPage === "calendar"
                        ? "/home/calendar"
                        : "/home/todo";
                    navigate(nextRoute);
                    dispatch(setPage("calendar"));
                  } else {
                    navigate(item.route!);
                    if (item.page) dispatch(setPage(item.page));
                  }
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
                    color: item.id === selectedId ? "#2196f3" : "inherit",
                  }}
                >
                  <img src={item.icon} alt={item.id} style={getImage()} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    </Drawer>
  );
}
