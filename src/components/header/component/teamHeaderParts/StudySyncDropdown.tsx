import React from "react";
import { Avatar, Typography, MenuItem, Paper, Divider } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { FaCaretDown } from "react-icons/fa";
import { getLastInitial } from "@/utils/name";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CreateWorkspaceButton from './CreateWorkspaceButton';

const StudySyncDropdown: React.FC = () => {
  const { name } = useSelector((state: RootState) => state.user);

  const avatarContent = getLastInitial(name);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
        >
          <Avatar sx={{ bgcolor: "#4caf50", width: 32, height: 32, fontSize: "0.875rem" }}>
            {avatarContent}
          </Avatar>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "medium", color: "text.primary" }}
          >
            StudySync
          </Typography>
          <FaCaretDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 z-[9999]" align="center">
          <MenuItem onClick={() => alert("Profile clicked")}>
            <Typography variant="body2">Hồ sơ</Typography>
          </MenuItem>
          <MenuItem onClick={() => alert("Settings clicked")}>
            <Typography variant="body2">Cài đặt</Typography>
          </MenuItem>
          
          <Divider sx={{ my: 0.5 }} /> 

          <MenuItem sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }} onClick={() => alert("Create Workspace clicked")}>
            <CreateWorkspaceButton />
          </MenuItem>
          
          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={() => alert("Logout clicked")}>
            <Typography variant="body2">Đăng xuất</Typography>
          </MenuItem>
      </PopoverContent>
    </Popover>
  );
};

export default StudySyncDropdown;