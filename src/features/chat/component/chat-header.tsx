import { Avatar, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import type { Contact } from "@/redux/chat/types";

interface ChatHeaderProps {
  selectedContact: Contact;
}

export default function ChatHeader({ selectedContact }: ChatHeaderProps) {
  return (
    <div className="mb-4 flex shrink-0 items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 bg-gray-200 text-xl text-gray-500">
          {selectedContact.name.charAt(0)}
        </Avatar>
        <div>
          <p className="font-semibold">{selectedContact.name}</p>
          <p className="text-gray-500">{selectedContact.status}</p>
        </div>
      </div>
      <IconButton className="rounded-full hover:bg-gray-100">
        <CloseIcon />
      </IconButton>
    </div>
  );
}
