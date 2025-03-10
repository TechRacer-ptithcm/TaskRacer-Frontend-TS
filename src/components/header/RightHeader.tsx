import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IoMdSettings } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCaretDown } from "react-icons/fa";
import boCon from '../../assets/image.png'

export default function RightHeader() {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className="flex items-center gap-2 rounded-full p-2 hover:cursor-pointer"
      >
        <FaSearch />
      </Button>
      <Button variant="ghost" className="rounded-full p-2 hover:cursor-pointer">
        <IoMdSettings />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full"
          >
            Ngày <FaCaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Ngày</DropdownMenuItem>
          <DropdownMenuItem>Tuần</DropdownMenuItem>
          <DropdownMenuItem>Tháng</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Avatar className="h-10 w-10 rounded-full bg-gray-300 hover:cursor-pointer" >
      <AvatarImage src= {boCon}  className="rounded-full h-10 w-10"/>
      <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
