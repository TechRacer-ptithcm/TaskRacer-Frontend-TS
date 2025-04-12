import { AppBar, Toolbar, Box, IconButton, Badge, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CalendarHeader from "./CalendarHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import notificationIcon from "@/assets/notification-svgrepo-com.svg";
import avatIcon from "@/assets/image.png";
import { getLastInitial } from "@/utils/name";

const drawerWidth = 82;

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
        pl: 65,
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
        <IconButton size="small" color="inherit">
          <Badge badgeContent={4} color="error">
            <img src={notificationIcon} alt="" className="h-[40px] w-[40px]" />
          </Badge>
        </IconButton>
        <Avatar sx={{ ml: 2, bgcolor: "#4caf50", width: 40, height: 40 }}>
          {getLastInitial(name)}
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
