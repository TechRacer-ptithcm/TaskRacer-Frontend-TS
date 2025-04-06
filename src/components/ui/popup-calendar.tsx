import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { Button } from "@/components/ui/button";
import { FiClock } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { FileText } from "lucide-react";
import { useSelector } from "react-redux";
import {
  setStartTime,
  setEndTime,
  setPriority,
  setStatus,
  setDescription,
  setTitle,
  close,
  setTime,
  createTask,
} from "@/redux/calendar/popupCalen.slice";
import { RootState, useAppDispatch } from "@/redux/store";
import { Input } from "./input";
import TimePicker from "./time-picker";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addTask } from "@/redux/calendar/task.slice";

export default function PopUpCalen() {
  const dispatch = useAppDispatch();
  const {
    isOpen,
    selectedDate,
    isSetTime,
    startTime,
    endTime,
    status,
    priority,
    description,
    title,
  } = useSelector((state: RootState) => state.popupCalen);

  const [editing, setEditing] = useState(false);

  const getPriorityLabel = (p: typeof priority) =>
    ({ LOW: "Thấp", MEDIUM: "Trung bình", HIGH: "Cao" })[p!] ?? "Độ ưu tiên";

  const getStatusLabel = (s: typeof status) =>
    ({
      TODO: "Phải làm",
      IN_PROGRESS: "Đang xử lý",
      DONE: "Hoàn thành",
      CANCELED: "Đã hủy",
    })[s!] ?? "Trạng thái";

  const handleSubmit = async () => {
    if (
      !title ||
      !priority ||
      !status ||
      !selectedDate ||
      !startTime ||
      !endTime
    )
      return;
    const startAt = `${selectedDate.format("YYYY-MM-DD")}T${startTime}:00.000Z`;
    const dueAt = `${selectedDate.format("YYYY-MM-DD")}T${endTime}:00.000Z`;
    const payload = {
      title,
      priority,
      description: description ?? "",
      startAt,
      dueAt,
      status,
    };
    try {
      const action = await dispatch(createTask(payload));
      if (createTask.fulfilled.match(action)) dispatch(addTask(action.payload));
    } catch (err) {
      console.error("Submit task failed", err);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(close())}
      PaperProps={{
        sx: {
          borderRadius: "1.5rem",
        },
      }}
    >
      <DialogContent className="max-w-lg space-y-4 rounded-3xl p-4 shadow-xl">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={() => dispatch(close())}>
            <IoCloseSharp className="h-5 w-5" />
          </Button>
        </div>

        <Input
          value={title ?? ""}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          placeholder="Thêm tiêu đề và thời gian"
          className="rounded-none border-0 border-b border-blue-400 text-base font-medium shadow-none focus-visible:border-b-2 focus-visible:border-blue-500 focus-visible:ring-0"
        />

        <div className="flex items-center gap-3 text-sm">
          <FiClock className="text-gray-600" />
          <div className="flex w-full items-center justify-between">
            <span className="capitalize">
              {selectedDate
                ? !isSetTime
                  ? `${selectedDate.format("dddd, D [tháng] M")} ⋅ ${startTime} – ${endTime}`
                  : selectedDate.format("dddd, D [tháng] M")
                : "Chưa chọn ngày"}
            </span>
            {isSetTime ? (
              <div className="flex items-center gap-x-2">
                <TimePicker
                  value={startTime ?? ""}
                  onChange={(val) => dispatch(setStartTime(val))}
                />
                <span>-</span>
                <TimePicker
                  value={endTime ?? ""}
                  onChange={(val) => dispatch(setEndTime(val))}
                />
              </div>
            ) : (
              <Button
                variant="outline"
                className="h-7 px-3 text-xs"
                onClick={() => dispatch(setTime(true))}
              >
                Thêm thời gian
              </Button>
            )}
          </div>
        </div>

        {editing ? (
          <Textarea
            autoFocus
            value={description ?? ""}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            placeholder="Nhập mô tả..."
            className="min-h-[80px] rounded-xl"
            onBlur={() => {
              if ((description ?? "").trim() === "") setEditing(false);
            }}
          />
        ) : (
          <Button
            variant="ghost"
            className="text-muted-foreground w-full justify-start rounded-xl bg-gray-100 hover:bg-gray-200"
            onClick={() => setEditing(true)}
          >
            <FileText className="mr-2 h-4 w-4" />
            Thêm mô tả
          </Button>
        )}

        <div className="flex justify-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-32">
                {getPriorityLabel(priority)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[9999] w-40">
              <DropdownMenuItem onSelect={() => dispatch(setPriority("LOW"))}>
                Thấp
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => dispatch(setPriority("MEDIUM"))}
              >
                Trung bình
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => dispatch(setPriority("HIGH"))}>
                Cao
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-32">
                {getStatusLabel(status)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[9999] w-40">
              <DropdownMenuItem onSelect={() => dispatch(setStatus("TODO"))}>
                Phải làm
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => dispatch(setStatus("IN_PROGRESS"))}
              >
                Đang xử lý
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => dispatch(setStatus("DONE"))}>
                Hoàn thành
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => dispatch(setStatus("CANCELED"))}
              >
                Đã hủy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="rounded-full bg-[#ff5470] px-6 py-3 font-['Baloo_2',sans-serif] font-medium text-white shadow-md hover:bg-[#ff3c5c]"
          >
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
