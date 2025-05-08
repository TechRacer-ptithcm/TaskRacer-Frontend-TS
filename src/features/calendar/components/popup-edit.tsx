import { Dialog, DialogContent } from "@mui/material";
import { Button } from "@/components/ui/button";
import { FiClock } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { Input } from "../../../components/ui/input";
import TimePicker from "../../../components/ui/time-picker";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import {
  closeEdit,
  updateTask,
  updateTaskThunk,
} from "@/redux/calendar/popupEdit.slice";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { updateTaskById } from "@/redux/calendar/task.slice";

export default function PopupEdit() {
  const { isEditOpen, task } = useSelector(
    (state: RootState) => state.popupEdit,
  );
  const dispatch = useAppDispatch();
  // const tasks = useSelector((state: RootState) => state.task.tasks);

  const handleSaveTask = async () => {
    if (!task) return;

    try {
      dispatch(updateTask(task));

      await dispatch(
        updateTaskThunk({
          taskId: task.id,
          title: task.title,
          description: task.description,
          startAt: task.start,
          dueAt: task.end,
          priority: task.priority,
          status: task.status,
        }),
      ).unwrap();

      dispatch(updateTaskById(task));
      dispatch(closeEdit());
    } catch (error) {
      console.error("Lỗi khi cập nhật task:", error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "EEEE, d MMMM", { locale: vi });
    } catch (error) {
      return "Thứ hai, 15 tháng 4";
    }
  };

  const handleUpdateTask = (updates: Partial<typeof task>) => {
    if (!task) return;
    dispatch(updateTask({ ...task, ...updates }));
  };

  return (
    <Dialog
      open={isEditOpen}
      onClose={() => dispatch(closeEdit())}
      PaperProps={{
        sx: {
          borderRadius: "1.5rem",
        },
      }}
    >
      <DialogContent className="max-w-lg space-y-4 rounded-3xl p-4 shadow-xl">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(closeEdit())}
          >
            <IoCloseSharp className="h-5 w-5" />
          </Button>
        </div>

        <Input
          placeholder="Thêm tiêu đề và thời gian"
          className="rounded-none border-0 border-b border-blue-400 text-base font-medium shadow-none focus-visible:border-b-2 focus-visible:border-blue-500 focus-visible:ring-0"
          value={task?.title || ""}
          onChange={(e) => handleUpdateTask({ title: e.target.value })}
        />

        <div className="flex items-center gap-4 space-y-2 text-sm">
          <FiClock className="mt-1 text-gray-600" />
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between gap-4">
              <span className="capitalize">
                {task?.start ? formatDate(task.start) : "Thứ hai, 15 tháng 4"}
              </span>
              <div className="flex items-center gap-x-2">
                <TimePicker
                  value={
                    task?.start
                      ? new Date(task.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : ""
                  }
                  onChange={(value) => {
                    if (!task?.start) return;
                    const date = new Date(task.start);
                    const [hours, minutes] = value.split(":");
                    date.setHours(parseInt(hours), parseInt(minutes));
                    handleUpdateTask({ start: date.toISOString() });
                  }}
                />
                <span>-</span>
                <TimePicker
                  value={
                    task?.end
                      ? new Date(task.end).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : ""
                  }
                  onChange={(value) => {
                    if (!task?.end) return;
                    const date = new Date(task.end);
                    const [hours, minutes] = value.split(":");
                    date.setHours(parseInt(hours), parseInt(minutes));
                    handleUpdateTask({ end: date.toISOString() });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <Textarea
          placeholder="Nhập mô tả..."
          className="min-h-[80px] rounded-xl"
          value={task?.description || ""}
          onChange={(e) => handleUpdateTask({ description: e.target.value })}
        />

        <div className="flex justify-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-32">
                {task?.priority === "LOW"
                  ? "Thấp"
                  : task?.priority === "HIGH"
                    ? "Cao"
                    : "Trung bình"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[9999] w-40">
              <DropdownMenuItem
                onClick={() => handleUpdateTask({ priority: "LOW" })}
              >
                Thấp
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUpdateTask({ priority: "MEDIUM" })}
              >
                Trung bình
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUpdateTask({ priority: "HIGH" })}
              >
                Cao
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-32">
                {task?.status === "TODO"
                  ? "Phải làm"
                  : task?.status === "IN_PROGRESS"
                    ? "Đang xử lý"
                    : task?.status === "DONE"
                      ? "Hoàn thành"
                      : "Đã hủy"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[9999] w-40">
              <DropdownMenuItem
                onClick={() => handleUpdateTask({ status: "TODO" })}
              >
                Phải làm
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUpdateTask({ status: "IN_PROGRESS" })}
              >
                Đang xử lý
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUpdateTask({ status: "DONE" })}
              >
                Hoàn thành
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUpdateTask({ status: "CANCELED" })}
              >
                Đã hủy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-end">
          <Button
            className="rounded-full bg-[#ff5470] px-6 py-3 font-['Baloo_2',sans-serif] font-medium text-white shadow-md hover:bg-[#ff3c5c]"
            onClick={handleSaveTask}
          >
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
