import { AppBar, Toolbar, Box, IconButton, Badge, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CalendarHeader from "./CalendarHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getLastInitial } from "@/utils/name";
import NotificationBadge from "./notifications/NotificationBadge";
const drawerWidth = 82;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 24,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: theme.spacing(3),
  width: 700,
  boxShadow: "8px 8px 12px 0px rgba(0, 0, 0, 0.1)",
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

const Header = () => {
  const { name } = useSelector((state: RootState) => state.user);
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  return (
    <AppBar
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        bgcolor: "#FFF2F2",
        color: "#333",
        py: 1,
        pl: 70,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: 80, mr: -70 }} />

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
          <NotificationBadge />
          <Avatar sx={{ bgcolor: "#4caf50", width: 40, height: 40 }}>
            {getLastInitial(name)}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
