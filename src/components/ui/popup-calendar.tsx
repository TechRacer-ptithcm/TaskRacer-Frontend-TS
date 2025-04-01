import { useRef, useEffect, useState } from "react";
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
} from "@/redux/calendar/popupCalen.slice";
import { RootState } from "@/redux/store";
import { close, setTime } from "@/redux/calendar/popupCalen.slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "./input";
import TimePicker from "./time-picker";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "@/redux/calendar/popupCalen.slice";
import { useAppDispatch } from "@/redux/store";
import { addTask } from '@/redux/calendar/task.slice';

export default function PopUpCalen() {
  const dispatch = useAppDispatch();
  const popoverRef = useRef<HTMLDivElement>(null);
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

  const getPriorityLabel = (priority: "LOW" | "MEDIUM" | "HIGH" | null) => {
    switch (priority) {
      case "LOW":
        return "Thấp";
      case "MEDIUM":
        return "Trung bình";
      case "HIGH":
        return "Cao";
      default:
        return "Độ ưu tiên";
    }
  };

  const getStatusLabel = (
    status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED" | null,
  ) => {
    switch (status) {
      case "TODO":
        return "Phải làm";
      case "IN_PROGRESS":
        return "Đang xử lý";
      case "DONE":
        return "Hoàn thành";
      case "CANCELED":
        return "Đã hủy";
      default:
        return "Trạng thái";
    }
  };

  const [editing, setEditing] = useState(false);

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
      console.log(payload)
      if (createTask.fulfilled.match(action)) {
        dispatch(addTask(action.payload));
      }
    } catch (err) {
      console.error("Submit task failed", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        !target.closest(".popover-content")
      ) {
        dispatch(close());
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => dispatch(close())}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-lg rounded-xl bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => dispatch(close())}>
            <IoCloseSharp className="h-5 w-5" />
          </Button>
        </div>

        <div className="w-full">
          <Input
            value={title ?? ""}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            placeholder="Thêm tiêu đề và thời gian"
            className="rounded-none border-0 border-b border-blue-400 text-base font-medium shadow-none focus-visible:border-b-2 focus-visible:border-blue-500 focus-visible:ring-0"
          />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <FiClock className="text-gray-600" />
            <div className="flex w-full items-center justify-between">
              <span className="text-sm text-black capitalize">
                {selectedDate
                  ? !isSetTime
                    ? `${selectedDate.format("dddd, D [tháng] M")} ⋅ ${startTime} – ${endTime}`
                    : selectedDate.format("dddd, D [tháng] M")
                  : "Chưa chọn ngày"}
              </span>
              <div className="flex items-center gap-x-2">
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

          <div className="w-full">
            {editing ? (
              <Textarea
                autoFocus
                value={description ?? ""}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                placeholder="Nhập mô tả..."
                className="min-h-[80px] w-full rounded-xl"
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
          </div>

          <div className="flex justify-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-32">
                  {getPriorityLabel(priority)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="popover-content w-40">
                <DropdownMenuItem onSelect={() => dispatch(setPriority("LOW"))}>
                  Thấp
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => dispatch(setPriority("MEDIUM"))}
                >
                  Trung bình
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => dispatch(setPriority("HIGH"))}
                >
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
              <DropdownMenuContent className="popover-content w-40">
                <DropdownMenuItem onSelect={() => dispatch(setStatus("TODO"))}>
                  Mở
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

          <div className="mt-4 flex justify-end">
            <Button onClick={handleSubmit} className="rounded-full px-6">
              Lưu
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
