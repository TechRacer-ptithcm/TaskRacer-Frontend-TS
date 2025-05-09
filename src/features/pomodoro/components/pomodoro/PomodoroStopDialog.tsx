import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { ConfirmButton } from "@/components/common/ConfirmButton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { pomodoroActions } from "@/redux/pomodoro/reducers/pomodoro.reducer";
import { stopPomodoroThunk as stopPomodoro } from "@/redux/pomodoro/actions/pomodoro.actions";

export const PomodoroStopDialog = () => {
  const dispatch = useAppDispatch();
  const isDialogOpen = useAppSelector(state => state.pomodoro.isDialogOpen);

  const handleClose = () => {
    dispatch(pomodoroActions.toggleDialogOpen());
  };

  const handleConfirm = () => {
    dispatch(stopPomodoro());
    dispatch(pomodoroActions.setIsActive(false));
    dispatch(pomodoroActions.setButtonText("Start"));
    dispatch(pomodoroActions.toggleDialogOpen());
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "1.5rem",
          padding: "1rem",
        },
      }}
    >
      <DialogTitle sx={{ fontFamily: "'Baloo 2', sans-serif" }}>
        Bạn có chắc chắn muốn dừng lại?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tiến trình Pomodoro của bạn sẽ bị dừng lại. Bạn có thể tiếp tục sau.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            fontFamily: "'Baloo 2', sans-serif",
            color: "#4B4E6D",
          }}
        >
          Hủy
        </Button>
        <ConfirmButton onClick={handleConfirm} label="Dừng lại" />
      </DialogActions>
    </Dialog>
  );
};
