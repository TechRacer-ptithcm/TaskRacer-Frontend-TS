import { Box, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getLastInitial } from "@/utils/name";
import NotificationBadge from "../notifications/NotificationBadge";

const UserActions = () => {
  const { name } = useSelector((state: RootState) => state.user);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
      <NotificationBadge />
      <Avatar sx={{ bgcolor: "#4caf50", width: 40, height: 40 }}>
        {getLastInitial(name)}
      </Avatar>
    </Box>
  );
};

export default UserActions;