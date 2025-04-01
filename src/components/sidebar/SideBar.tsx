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

const getImage = () => ({
  height: "40px",
  width: "40px",
});
const icons = [
  {
    id: "dashboard",
    icon: () => (
      <img
        src="src\assets\dashboard-svgrepo-com.svg"
        alt=""
        style={getImage()}
      />
    ),
  },
  {
    id: "calendar",
    icon: () => (
      <img
        src="src\assets\calendar-svgrepo-com.svg"
        alt=""
        style={getImage()}
      />
    ),
  },
  {
    id: "pomodoro",
    icon: () => (
      <img
        src="src\assets\clock-circle-svgrepo-com.svg"
        alt=""
        style={getImage()}
      />
    ),
  },
  {
    id: "chat",
    icon: () => (
      <img
        src="src\assets\chat-round-line-svgrepo-com.svg"
        alt=""
        style={getImage()}
      />
    ),
  },
  {
    id: "rank",
    icon: () => (
      <img
        src="src\assets\ranking-1-svgrepo-com.svg"
        alt=""
        style={getImage()}
      />
    ),
  },
  {
    id: "edit-user",
    icon: () => (
      <img
        src="src\assets\user-rounded-svgrepo-com.svg"
        alt=""
        style={getImage()}
      />
    ),
  },
];

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const drawerWidth = 82;
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
        <Box sx={{ mb: 25, pl: 2 }}>
          <img src="src\assets\TaskRacerLogo.png" alt="" />
        </Box>
        <List sx={{ width: "100%", pl: 2 }}>
          {icons.map((Icon, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block", mb: 5 }}
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