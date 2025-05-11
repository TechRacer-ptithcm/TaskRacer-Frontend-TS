import { Avatar, IconButton, Divider } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Description as DescriptionIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import type { Contact } from "@/redux/chat/types";
import { useNavigate } from "react-router-dom";

interface ProfileSidebarProps {
  selectedContact: Contact;
}

export default function ProfileSidebar({
  selectedContact,
}: ProfileSidebarProps) {
  const navigate = useNavigate();
  return (
    <div className="relative w-full rounded-[50px] bg-[#F4F6FE] p-6 shadow-[20px_20px_40px_0px_rgba(0,_0,_0,_0.1)]">
      <div className="flex h-full flex-col gap-4 overflow-y-auto">
        {/* Profile info */}
        <div className="flex flex-col items-center">
          <Avatar
            className="mb-2 h-20 w-20 bg-gray-200 text-gray-500"
            sx={{ width: 80, height: 80 }}
          >
            {selectedContact.name.charAt(0)}
          </Avatar>
          <p className="font-bold">{selectedContact.name}</p>
          <p className="text-gray-500">{selectedContact.username}</p>
        </div>

        {/* Information section */}
        <div className="mt-6 rounded-[30px] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Thành viên trong đoạn chat</p>
            </div>
            <IconButton size="small">
              <ExpandMoreIcon />
            </IconButton>
          </div>

          <Divider />
        </div>

        {/* File & Media section */}
        <div className="rounded-[30px] bg-[#FFE5E8] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DescriptionIcon />
              <p className="font-semibold">File & Media</p>
            </div>
            <IconButton size="small">
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
        <div className="rounded-[30px] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Bài viết của nhóm</p>
            </div>
            <IconButton size="small" onClick={() => navigate("/home/post")}>
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
