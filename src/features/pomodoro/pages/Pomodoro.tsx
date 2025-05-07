import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import { Edit } from "lucide-react";
import "@fontsource/baloo-2";
import { SettingsDialog } from "@/features/pomodoro/components/setting-pomodoro";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import {
  setMode,
  setTime,
  setIsActive,
  setButtonText,
  setProgress,
  setCompletedSessions,
} from "@/redux/pomodoro/slices/pomodoro.slice";
import {
  startPomodoroThunk as startPomodoro,
  stopPomodoroThunk as stopPomodoro,
  getStartTimeThunk as getStartTime,
} from "@/redux/pomodoro/slices/pomodoro.slice";
import { checkpointPomodoro } from "@/redux/pomodoro/pomodoro.slice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Pomodoro = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStartTime());
  }, [dispatch]);
  const {
    settings,
    mode,
    time,
    isActive,
    buttonText,
    progress,
    completedSessions,
  } = useSelector((state: RootState) => state.pomodoro);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const modes = {
    focus: { label: "Focus", duration: settings.pomodoro },
    shortBreak: { label: "Short Break", duration: settings.shortBreak },
    longBreak: { label: "Long Break", duration: settings.longBreak },
  };

  useEffect(() => {
    dispatch(setTime({ minutes: modes[mode].duration, seconds: 0 }));
    dispatch(setIsActive(false));
    dispatch(setButtonText("Start"));
    dispatch(setProgress(100));

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode, settings, dispatch]);

  useEffect(() => {
    const totalSeconds = modes[mode].duration * 60;
    const currentSeconds = time.minutes * 60 + time.seconds;
    dispatch(setProgress((currentSeconds / totalSeconds) * 100));
  }, [time, mode, dispatch]);

  const handleTimerComplete = () => {
    const newSessions = completedSessions + 1;
    const isLongBreak = newSessions % settings.longBreakInterval === 0;

    dispatch(setCompletedSessions(isLongBreak ? 0 : newSessions));

    if (mode === "focus") {
      if (settings.autoStartBreaks) {
        dispatch(setMode(isLongBreak ? "longBreak" : "shortBreak"));
        dispatch(setIsActive(true));
        dispatch(setButtonText("Stop"));
      } else {
        dispatch(setIsActive(false));
        dispatch(setButtonText("Start"));
      }
    } else {
      if (settings.autoStartPomodoros) {
        dispatch(setMode("focus"));
        dispatch(setIsActive(true));
        dispatch(setButtonText("Stop"));
      } else {
        dispatch(setIsActive(false));
        dispatch(setButtonText("Start"));
      }
    }
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        const { minutes, seconds } = time;
        let updatedTime;

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            handleTimerComplete();
            updatedTime = { minutes: modes[mode].duration, seconds: 0 };
          } else {
            updatedTime = { minutes: minutes - 1, seconds: 59 };
          }
        } else {
          updatedTime = { minutes, seconds: seconds - 1 };
        }

        dispatch(setTime(updatedTime));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, mode, time, settings]);

  const toggleTimer = () => {
    if (!isActive) {
      dispatch(startPomodoro());
      dispatch(setIsActive(true));
      dispatch(setButtonText("Pause"));
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleConfirmStop = () => {
    dispatch(stopPomodoro());
    dispatch(setIsActive(false));
    dispatch(setButtonText("Start"));
    setIsDialogOpen(false);
  };

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center px-6">
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
          onClick={() => setIsSettingsOpen(true)}
        >
          <Edit size={38} />
        </button>
      </div>

      <div className="mb-15 flex w-full gap-2">
        {Object.entries(modes).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() =>
              dispatch(setMode(key as "focus" | "shortBreak" | "longBreak"))
            }
            className={`flex-1 cursor-pointer rounded-full px-4 py-3 font-['Baloo_2',sans-serif] text-lg font-semibold transition-colors ${
              mode === key
                ? "bg-[#FFD6D6] text-[#4B4E6D]"
                : "text-[#4B4E6D] hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative mb-15 flex h-84 w-84 items-center justify-center">
        <svg
          className="absolute h-full w-full -rotate-90"
          viewBox="0 0 256 256"
        >
          <circle
            cx="128"
            cy="128"
            r={radius}
            fill="none"
            stroke="#f1f1f1"
            strokeWidth="8"
          />
          <circle
            cx="128"
            cy="128"
            r={radius}
            fill="none"
            stroke="#F3737E"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="z-10">
          <span className="font-['Baloo_2',sans-serif] text-7xl font-bold">
            {formatTime(time.minutes, time.seconds)}
          </span>
        </div>
      </div>

      <div className="mb-4 text-center">
        <span className="font-['Baloo_2',sans-serif] text-sm text-[#4B4E6D]">
          Sessions: {completedSessions} / {settings.longBreakInterval}
        </span>
      </div>

      <button
        onClick={toggleTimer}
        className="mb-12 cursor-pointer rounded-md border border-slate-300 bg-white px-12 py-3 font-['Baloo_2',sans-serif] text-2xl font-semibold text-slate-600 shadow-md transition-all hover:shadow-lg active:translate-y-1 active:shadow-sm"
      >
        {buttonText}
      </button>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
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
            onClick={() => setIsDialogOpen(false)}
            sx={{
              fontFamily: "'Baloo 2', sans-serif",
              color: "#4B4E6D",
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmStop}
            variant="contained"
            sx={{
              backgroundColor: "#F3737E",
              "&:hover": {
                backgroundColor: "#e25761",
              },
              fontFamily: "'Baloo 2', sans-serif",
            }}
          >
            Dừng lại
          </Button>
        </DialogActions>
      </Dialog>

      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </div>
  );
};

export default Pomodoro;
