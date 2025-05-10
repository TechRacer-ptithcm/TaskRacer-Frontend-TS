import SearchBar from "./search-bar";
import ContactList from "./contact-list";
import type { Contact } from "@/redux/chat/types";

interface SidebarProps {
  contacts: Contact[];
  selectedContactId: string;
  onContactClick: (contactId: string) => void;
}

export default function Sidebar({
  contacts,
  selectedContactId,
  onContactClick,
}: SidebarProps) {
  return (
    <div className="relative w-full rounded-[50px] bg-[#F4F6FE] pt-6">
      <div className="flex h-full flex-col">
        <div className="shrink-0 rounded-tl-[50px] rounded-tr-[50px] bg-white pt-5 pb-5">
          <p className="font bold mb-4 pl-7 text-4xl">Chat</p>
          <SearchBar />
        </div>
        <ContactList
          contacts={contacts}
          selectedContactId={selectedContactId}
          onContactClick={onContactClick}
        />
      </div>
    </div>
  );
}
