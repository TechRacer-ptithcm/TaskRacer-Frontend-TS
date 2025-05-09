import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { SettingsDialog } from "@/features/pomodoro/components/setting/setting-pomodoro";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import {
  startPomodoroThunk as startPomodoro,
  getStartTimeThunk as getStartTime,
} from "@/redux/pomodoro/actions/pomodoro.actions";
import { pomodoroActions } from "@/redux/pomodoro/reducers/pomodoro.reducer";
import { PomodoroHeader } from "@/features/pomodoro/components/pomodoro/PomodoroHeader";
import { PomodoroStopDialog } from "@/features/pomodoro/components/pomodoro/PomodoroStopDialog";

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

  const modes = {
    focus: { label: "Focus", duration: settings.pomodoro },
    shortBreak: { label: "Short Break", duration: settings.shortBreak },
    longBreak: { label: "Long Break", duration: settings.longBreak },
  };

  useEffect(() => {
    dispatch(pomodoroActions.setTime({ minutes: modes[mode].duration, seconds: 0 }));
    dispatch(pomodoroActions.setIsActive(false));
    dispatch(pomodoroActions.setButtonText("Start"));
    dispatch(pomodoroActions.setProgress(100));

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode, settings, dispatch]);

  useEffect(() => {
    const totalSeconds = modes[mode].duration * 60;
    const currentSeconds = time.minutes * 60 + time.seconds;
    dispatch(pomodoroActions.setProgress((currentSeconds / totalSeconds) * 100));
  }, [time, mode, dispatch]);

  const handleTimerComplete = () => {
    const newSessions = completedSessions + 1;
    const isLongBreak = newSessions % settings.longBreakInterval === 0;

    dispatch(pomodoroActions.setCompletedSessions(isLongBreak ? 0 : newSessions));

    if (mode === "focus") {
      if (settings.autoStartBreaks) {
        dispatch(pomodoroActions.setMode(isLongBreak ? "longBreak" : "shortBreak"));
        dispatch(pomodoroActions.setIsActive(true));
        dispatch(pomodoroActions.setButtonText("Stop"));
      } else {
        dispatch(pomodoroActions.setIsActive(false));
        dispatch(pomodoroActions.setButtonText("Start"));
      }
    } else {
      if (settings.autoStartPomodoros) {
        dispatch(pomodoroActions.setMode("focus"));
        dispatch(pomodoroActions.setIsActive(true));
        dispatch(pomodoroActions.setButtonText("Stop"));
      } else {
        dispatch(pomodoroActions.setIsActive(false));
        dispatch(pomodoroActions.setButtonText("Start"));
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

        dispatch(pomodoroActions.setTime(updatedTime));
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
      dispatch(pomodoroActions.setIsActive(true));
      dispatch(pomodoroActions.setButtonText("Stop"));
    } else {
      dispatch(pomodoroActions.toggleDialogOpen());
    }
  };

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center px-6">
      <PomodoroHeader />
      <div className="mb-15 flex w-full gap-2">
        {Object.entries(modes).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() =>
              dispatch(pomodoroActions.setMode(key as "focus" | "shortBreak" | "longBreak"))
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
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 700,
              fontSize: "7xl",
              color: "#4B4E6D",
            }}
          >
            {formatTime(time.minutes, time.seconds)}
          </Typography>
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

      <PomodoroStopDialog />

      <SettingsDialog />
    </div>
  );
};

export default Pomodoro;
