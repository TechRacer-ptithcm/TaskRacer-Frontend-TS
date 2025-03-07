import { HiPlus } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function CreateTask() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2">
          <HiPlus />
          Tạo
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Công việc mới</DropdownMenuItem>
        <DropdownMenuItem>Dự án mới</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
