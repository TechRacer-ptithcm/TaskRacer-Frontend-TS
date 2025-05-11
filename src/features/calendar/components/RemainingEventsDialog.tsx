import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent, /* DialogTitle, IconButton, */ List, ListItem, ListItemText, Typography } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import dayjs from "dayjs";
import { RootState } from "@/redux/store";
import { closeRemainingEventsDialog } from "@/redux/calendar/remainingEventsDialog.slice";
import { Task } from "@/redux/calendar/task.slice"; // Giả sử Task type
import { Button } from "@/components/ui/button"; // Thêm import Button

const RemainingEventsDialog: FC = () => {
  const dispatch = useDispatch();
  const { isOpen, events, date } = useSelector(
    (state: RootState) => state.remainingEventsDialog,
  );

  const handleClose = () => {
    dispatch(closeRemainingEventsDialog());
  };

  const getPriorityColorText = (priority: Task['priority'] | undefined) => {
    switch (priority) {
      case "LOW":
        return "text-blue-500";
      case "MEDIUM":
        return "text-yellow-500";
      case "HIGH":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}
    PaperProps={{
        sx: {
          borderRadius: "1.5rem", // tương đương rounded-3xl
        },
      }}
    >
      <DialogContent className="max-w-lg space-y-4 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="div" className="font-semibold text-lg">
            Sự kiện khác {date ? `ngày ${dayjs(date).format("DD/MM")}` : ""}
          </Typography>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <IoCloseSharp className="h-5 w-5" />
          </Button>
        </div>

        {events.length > 0 ? (
          <List dense>
            {events.map((event) => (
              <ListItem key={event.id} disablePadding sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: '1px solid #eee', pb: 1, mb: 1}}>
                <ListItemText
                  primary={event.title || "(Không có tiêu đề)"}
                  secondary={`Bắt đầu: ${dayjs(event.start).format("HH:mm")}`}
                  primaryTypographyProps={{ fontWeight: 'medium', className: 'text-sm' }}
                  secondaryTypographyProps={{ className: 'text-xs' }}
                />
                <Typography variant="caption" className={`${getPriorityColorText(event.priority)} text-xs`}>
                  Ưu tiên: {event.priority || "Không rõ"}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>Không có sự kiện nào.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RemainingEventsDialog;