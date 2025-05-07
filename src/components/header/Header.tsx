import { AppBar } from "@mui/material";
import CalendarHeader from "./CalendarHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import GenericPageHeaderToolbar from "./GenericPageHeaderToolbar";
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
      }}
    >
      {currentPage === "calendar" ? (
        <CalendarHeader />
      ) : (
        <GenericPageHeaderToolbar />
      )}
    </AppBar>
  );
};

export default Header;
