import { AppBar, Toolbar, Box, IconButton, Badge, Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CalendarHeader from "./CalendarHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const drawerWidth = 72;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  maxWidth: 300,
}));

const SearchIconWrapper = styled("div")({
  padding: "0 12px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

const Header = () => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  return (
    <AppBar
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        bgcolor: "#faf7f7",
        color: "#333",
        py: 1,
      }}
    >
      <Toolbar>
        {currentPage === "calendar" ? (
          <CalendarHeader />
        ) : (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        )}
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
  );
};

export default Header;
