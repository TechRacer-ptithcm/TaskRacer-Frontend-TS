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
} from "@/redux/calendar/popupCalen.slice";
import { createTask } from "@/redux/calendar/task.slice";
import { RootState, useAppDispatch } from "@/redux/store";
import { Input } from "../../../components/ui/input";
import TimePicker from "../../../components/ui/time-picker";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dayjs from "dayjs";

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

  const ensureDefaults = () => {
    return {
      finalTitle: title?.trim() || "(Không có tiêu đề)",
      finalPriority: priority || "LOW",
      finalStatus: status || "TODO",
      finalDescription: description ?? "",
      taskType: "TASK"
    };
  };

  const handleSubmit = async () => {
    if (!selectedDate || !startTime || !endTime) return;

    const date = dayjs(selectedDate);
    const startAt = date.set('hour', Number(startTime.split(':')[0]))
                   .set('minute', Number(startTime.split(':')[1])).toISOString();
    const dueAt = date.set('hour', Number(endTime.split(':')[0]))
                 .set('minute', Number(endTime.split(':')[1])).toISOString();

    const { finalTitle, finalPriority, finalStatus, finalDescription, taskType } =
      ensureDefaults();

    const payload = {
      title: finalTitle,
      priority: finalPriority,
      description: finalDescription,
      startAt,
      dueAt,
      status: finalStatus,
      taskType: taskType
    };

    console.log(payload);

    dispatch(createTask(payload));
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
          placeholder="Thêm tiêu đề"
          className="rounded-none border-0 border-b border-blue-400 text-base font-medium shadow-none focus-visible:border-b-2 focus-visible:border-blue-500 focus-visible:ring-0"
        />

        <div className="flex items-center gap-4 space-y-2 text-sm">
          <FiClock className="mt-1 text-gray-600" />
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between gap-4">
              <span className="capitalize">
                {selectedDate
                  ? !isSetTime
                    ? `${dayjs(selectedDate).format("dddd, D [tháng] M")} ⋅ ${startTime} – ${endTime}`
                    : dayjs(selectedDate).format("dddd, D [tháng] M")
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
