import { AppBar, Toolbar, Box } from "@mui/material";
import CalendarHeader from "./CalendarHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SearchBar from "./component/SearchBar";
import UserActions from "./component/UserActions";
const drawerWidth = 82;

const Header = () => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  return (
    <AppBar
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        bgcolor: "#FFF2F2",
        color: "#333",
        py: 1,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}
      >
        <Box sx={{ width: 80 }} />

        {currentPage === "calendar" ? (
          <CalendarHeader />
        ) : (
          <SearchBar />
        )}
        <UserActions />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
