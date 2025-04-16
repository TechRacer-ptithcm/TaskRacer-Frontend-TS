import { Dialog, DialogContent } from "@mui/material";
import { Button } from "@/components/ui/button";
import { FiClock } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { FileText } from "lucide-react";
import { Input } from "./input";
import TimePicker from "./time-picker";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TaskModalUI({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "1.5rem",
        },
      }}
    >
      <DialogContent className="max-w-lg space-y-4 rounded-3xl p-4 shadow-xl">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <IoCloseSharp className="h-5 w-5" />
          </Button>
        </div>

        <Input
          placeholder="Thêm tiêu đề và thời gian"
          className="rounded-none border-0 border-b border-blue-400 text-base font-medium shadow-none focus-visible:border-b-2 focus-visible:border-blue-500 focus-visible:ring-0"
        />

        <div className="flex items-center gap-4 space-y-2 text-sm">
          <FiClock className="mt-1 text-gray-600" />
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between gap-4">
              <span className="capitalize">Thứ hai, 15 tháng 4</span>
              <div className="flex items-center gap-x-2">
                <TimePicker value="" onChange={() => {}} />
                <span>-</span>
                <TimePicker value="" onChange={() => {}} />
              </div>
            </div>
          </div>
        </div>

        <Textarea
          placeholder="Nhập mô tả..."
          className="min-h-[80px] rounded-xl"
        />

        <div className="flex justify-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-32">Độ ưu tiên</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[9999] w-40">
              <DropdownMenuItem>Thấp</DropdownMenuItem>
              <DropdownMenuItem>Trung bình</DropdownMenuItem>
              <DropdownMenuItem>Cao</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-32">Trạng thái</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[9999] w-40">
              <DropdownMenuItem>Phải làm</DropdownMenuItem>
              <DropdownMenuItem>Đang xử lý</DropdownMenuItem>
              <DropdownMenuItem>Hoàn thành</DropdownMenuItem>
              <DropdownMenuItem>Đã hủy</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-end">
          <Button className="rounded-full bg-[#ff5470] px-6 py-3 font-['Baloo_2',sans-serif] font-medium text-white shadow-md hover:bg-[#ff3c5c]">
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
