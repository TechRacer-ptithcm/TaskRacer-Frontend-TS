import { AppBar } from "@mui/material";
import CalendarHeader from "./CalendarHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import GenericPageHeaderToolbar from "./GenericPageHeaderToolbar";
import TeanHeader from "./TeanHeader";
const drawerWidth = 82;

const renderSpecificHeader = (currentPage: string) => {
  if (currentPage === "calendar") {
    return <CalendarHeader />;
  } else if (currentPage === "team") {
    return <TeanHeader />;
  } else {
    return <GenericPageHeaderToolbar />;
  }
};

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
      {renderSpecificHeader(currentPage)}
    </AppBar>
  );
};

export default Header;
