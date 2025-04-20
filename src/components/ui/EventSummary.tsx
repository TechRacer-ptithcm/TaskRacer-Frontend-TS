import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Dialog, DialogContent } from "@mui/material";
import { closeSummaryPopup } from "@/redux/calendar/popupSummary.slice";
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteTaskByIdThunk } from "@/redux/calendar/task.slice";
import { useAppDispatch } from "@/redux/store";
import { openEdit } from "@/redux/calendar/popupCalen.slice";

const EventSummary: FC = () => {
  const popup = useSelector((state: RootState) => state.popupSummary);
  const task = useSelector((state: RootState) => state.popupSummary.task);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (!task) return;
    dispatch(deleteTaskByIdThunk(task.id));
    dispatch(closeSummaryPopup());
  };

  const handleEdit = () => {
    dispatch(closeSummaryPopup());
    dispatch(openEdit());
  };

  if (!popup.task) return null;

  return (
    <Dialog
      open={popup.isOpen}
      onClose={() => dispatch(closeSummaryPopup())}
      PaperProps={{
        sx: {
          borderRadius: "24px",
          maxWidth: 500,
          p: 3,
        },
      }}
    >
      <DialogContent
        sx={{
          width: 340,
          minHeight: 240,
          padding: 3,
          borderRadius: "24px",
        }}
      >
        <div className="space-y-4 font-['Baloo_2',sans-serif] text-[16px] leading-relaxed">
          <div className="mb-2 flex items-center justify-between text-sm text-gray-400">
            <span>{popup.task.start?.slice(0, 10)}</span>
            <div className="flex gap-2">
              <Tooltip title="Sửa">
                <IconButton
                  size="small"
                  onClick={handleEdit}
                  >
                  <Edit fontSize="small" className="text-gray-600" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa">
                <IconButton size="small" onClick={() => handleDelete()}>
                  <Delete fontSize="small" className="text-red-500" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#4B4D6E]">
            {popup.task.title || "(Không có tiêu đề)"}
          </h3>

          <p className="text-base text-gray-600">{popup.task.description}</p>

          <div className="space-y-1 text-sm">
            <p>
              ⏰ {popup.task.start?.slice(11, 16)} -{" "}
              {popup.task.end?.slice(11, 16)}
            </p>
            <p>❄️ Status: {popup.task.status}</p>
            <p>⭐ Priority: {popup.task.priority}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventSummary;
