import { Box, Toolbar } from "@mui/material";
import CalendarControls from "./component/calendarHeaderParts/CalendarControls";
import UserActions from "./component/UserActions";

const CalendarHeader = () => {
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        px: 2,
      }}
    >
      <Box sx={{ width: 80, flexShrink: 0 }} />
      <CalendarControls />
      <UserActions />
    </Toolbar>
  );
};

export default CalendarHeader;
