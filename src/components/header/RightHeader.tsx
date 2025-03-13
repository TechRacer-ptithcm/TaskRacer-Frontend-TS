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
import boCon from "../../assets/image.png";
import { setViewMode } from "@/redux/calendar/ViewMode";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function RightHeader() {
  const dispatch = useDispatch();
  const selectedViewMode = useSelector((state: RootState) => state.viewMode.selectedViewMode);

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
        <Button variant="outline" className="flex items-center gap-2 rounded-full">
          {selectedViewMode === "day" ? "Ngày" : selectedViewMode === "week" ? "Tuần" : "Tháng"}
          <FaCaretDown />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => dispatch(setViewMode("day"))}>
            Ngày
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => dispatch(setViewMode("week"))}>
            Tuần
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => dispatch(setViewMode("month"))}>
            Tháng
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Avatar className="h-10 w-10 rounded-full bg-gray-300 hover:cursor-pointer">
        <AvatarImage src={boCon} className="h-10 w-10 rounded-full" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
