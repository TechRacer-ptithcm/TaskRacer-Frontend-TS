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
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

// Custom styled search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 24,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: theme.spacing(3),
  width: 785,
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
const getImage = () => ({
  height: "40px",
  width: "40px",
});

// Navigation icons
const icons = [
  () => (
    <img src="src\assets\dashboard-svgrepo-com.svg" alt="" style={getImage()} />
  ),
  () => (
    <img src="src\assets\calendar-svgrepo-com.svg" alt="" style={getImage()} />
  ),
  () => (
    <img
      src="src\assets\clock-circle-svgrepo-com.svg"
      alt=""
      style={getImage()}
    />
  ),
  () => (
    <img
      src="src\assets\chat-round-line-svgrepo-com.svg"
      alt=""
      style={getImage()}
    />
  ),
  () => (
    <img src="src\assets\ranking-1-svgrepo-com.svg" alt="" style={getImage()} />
  ),
  () => (
    <img
      src="src\assets\user-rounded-svgrepo-com.svg"
      alt=""
      style={getImage()}
    />
  ),
];

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const drawerWidth = 80;

  const navigate = useNavigate();
  const routes = [
    "/home",
    "/home/schedule",
    "/home/pomodoro",
    "/home/chat",
    "/home/ranking",
    "/home/edit-user",
  ];

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
                  navigate(routes[index]);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  borderRadius: "50%",
                  mx: "auto",
                  width: 50,
                  height: 50,
                  "&.Mui-selected": {
                    bgcolor: "#e3f2fd",
                    color: "#1976d2",
                    boxShadow: "0 4px 8px rgba(37, 74, 111, 0.2)",
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
                  <Icon />
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
          bgcolor: "#FFF2F2",
          color: "#333",
          py: 1,
          pt: 3,
        }}
      >
        <Toolbar>
          <Box sx={{ ml: 60 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="small" color="inherit">
            <Badge badgeContent={4} color="error">
              <img
                src="src\assets\notification-svgrepo-com.svg"
                alt=""
                style={getImage()}
              />
            </Badge>
          </IconButton>
          <Avatar sx={{ ml: 5, width: 60, height: 60, mr: 3 }}>
            <img
              src="src\assets\image.png"
              alt=""
              style={{ width: 60, height: 60 }}
            />
          </Avatar>
        </Toolbar>
      </AppBar>
    </>
  );
}
