import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  AppBar,
  Toolbar,
  InputBase,
  Badge,
  Avatar,
  styled,
  alpha,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "@/redux/store";
import { setPage } from "@/redux/page/pageSlice";
import CalendarHeader from "../header/CalendarHeader";

// Logo SVG component
const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" fill="white" stroke="#333" strokeWidth="2" />
    <circle cx="35" cy="40" r="8" fill="#333" />
    <circle cx="65" cy="40" r="8" fill="#333" />
    <path d="M35 60 Q50 70 65 60" stroke="#333" strokeWidth="3" fill="none" />
    <rect x="30" y="55" width="40" height="25" rx="5" fill="#e74c3c" />
    <path d="M30 60 Q50 75 70 60" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

// Custom styled search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 24,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: theme.spacing(3),
  width: "100%",
  maxWidth: 600,
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

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
          <Logo />
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
                    setPage(icons[index].id as "calendar" | "dashboard" | "pomodoro"),
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

      {/* Top AppBar */}
      <AppBar
        elevation={0}
        sx={{
          width: `calc(100% - 72px)`, // 72px = drawerWidth
          bgcolor: "#faf7f7",
          color: "#333",
          py: 1,
        }}
      >
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar sx={{ ml: 2, bgcolor: "#4caf50", width: 40, height: 40 }}>
            U
          </Avatar>
        </Toolbar>
      </AppBar>
    </>
  );
}
