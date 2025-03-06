import { Avatar } from "@radix-ui/react-avatar";
import { IoMdSettings } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";

export default function RightHeader() {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className="flex items-center gap-2 rounded-full p-2"
      >
        <FaSearch />
      </Button>
      <Button variant="ghost" className="p-2 rounded-full">
        <IoMdSettings />
      </Button>
      <Avatar className="h-10 w-10 rounded-full bg-gray-300" />
    </div>
  );
}
