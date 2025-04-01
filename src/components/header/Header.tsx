import { AppBar, Toolbar, Box, IconButton, Badge, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

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

const Header = () => (
  <AppBar
    elevation={0}
    sx={{
      width: `calc(100% - ${drawerWidth}px)`,
      bgcolor: "#FFF2F2",
      color: "#333",
      py: 1,
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
            className="h-[40px] w-[40px]"
          />
        </Badge>
      </IconButton>
      <Avatar sx={{ ml: 5, width: 60, height: 60 }}>
        <img
          src="src\assets\image.png"
          alt=""
          style={{ width: 60, height: 60 }}
        />
      </Avatar>
    </Toolbar>
  </AppBar>
);

export default Header;
