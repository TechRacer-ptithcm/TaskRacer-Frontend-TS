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
import CreateTeamDialog from './CreateTeamDialog';

const StudySyncDropdown: React.FC = () => {
  const { name } = useSelector((state: RootState) => state.user);

  const avatarContent = getLastInitial(name);

  return (
    <>
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
              {name}
            </Typography>
            <FaCaretDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0 z-[9999]" align="center">
            
            <Divider sx={{ my: 0.5 }} /> 

            <MenuItem 
              sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}
            >
              <CreateWorkspaceButton />
            </MenuItem>
            
            <Divider sx={{ my: 0.5 }} />
        </PopoverContent>
      </Popover>

      <CreateTeamDialog />
    </>
  );
};

export default StudySyncDropdown;