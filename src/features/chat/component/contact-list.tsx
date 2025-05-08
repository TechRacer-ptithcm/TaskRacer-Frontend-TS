"use client";

import { Avatar } from "@mui/material";
import type { Contact } from "@/redux/chat/types";

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: string;
  onContactClick: (contactId: string) => void;
}

export default function ContactList({
  contacts,
  selectedContactId,
  onContactClick,
}: ContactListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {contacts.map((contact, index) => {
        const isSelected = contact.id === selectedContactId;
        const isAbove = contacts[index + 1]?.id === selectedContactId;
        const isBelow = contacts[index - 1]?.id === selectedContactId;

        const borderColor = isSelected
          ? "border-transparent"
          : isAbove || isBelow
            ? "border-transparent"
            : "border-transparent";

        const roundedClass =
          index === contacts.length - 1 &&
          contacts[contacts.length - 2]?.id === selectedContactId
            ? "rounded-br-[50px] rounded-bl-[50px] pb-3 rounded-tr-[50px] "
            : isAbove
              ? "rounded-br-full"
              : isBelow
                ? "rounded-tr-full"
                : isSelected
                  ? "rounded-r-none"
                  : "";

        return (
          <div
            key={contact.id}
            className={`flex cursor-pointer items-center gap-3 border-r-4 p-5 transition-all duration-200 ${borderColor} ${
              isSelected
                ? "bg-[#F4F6FE]"
                : `bg-white ${roundedClass} border-transparent`
            } ${roundedClass} ${index === contacts.length - 1 ? "rounded-br-[50px] rounded-bl-[50px] pb-3" : ""}`}
            onClick={() => onContactClick(contact.id)}
          >
            <Avatar className="h-12 w-12 bg-gray-200 text-gray-500">
              {contact.name.charAt(0)}
            </Avatar>
            <div>
              <p className="font-semibold text-gray-600">{contact.name}</p>
              <p className="text-gray-400">{contact.status}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
