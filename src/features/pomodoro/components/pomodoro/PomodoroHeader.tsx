import Typography from "@mui/material/Typography";
import { Edit } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { pomodoroActions } from "@/redux/pomodoro/reducers/pomodoro.reducer";

export const PomodoroHeader = () => {
  const dispatch = useAppDispatch();

  const handleSettingsOpen = () => {
    dispatch(pomodoroActions.toggleSettingsOpen());
  };

  return (
    <div className="mb-8 flex w-full items-center justify-between">
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 600,
          color: "#4B4E6D",
        }}
      >
        Pomodoro
      </Typography>
      <button
        className="cursor-pointer p-2 text-slate-700"
        onClick={handleSettingsOpen}
      >
        <Edit size={38} />
      </button>
    </div>
  );
};