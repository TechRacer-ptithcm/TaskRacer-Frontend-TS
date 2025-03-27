import type React from "react";

import Typography from "@mui/material/Typography";
import { useState, useEffect, useRef } from "react";
import { Edit, MoreVertical, Plus, CheckCircle, Check } from "lucide-react";
import "@fontsource/baloo-2";
import {
  SettingsDialog,
  type TimerSettings,
} from "@/components/ui/setting-pomodoro";
import { TaskDialog } from "@/components/ui/task-dialog";

interface Task {
  name: string;
  completed: number;
  total: number;
  isCompleted: boolean;
}

const Pomodoro = () => {
  // Timer settings with default values
  const [timerSettings, setTimerSettings] = useState<TimerSettings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4,
  });

  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">(
    "focus",
  );
  const [time, setTime] = useState({
    minutes: timerSettings.pomodoro,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [progress, setProgress] = useState(100);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null,
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Update modes when settings change
  const modes = {
    focus: { label: "Focus", duration: timerSettings.pomodoro },
    shortBreak: { label: "Short Break", duration: timerSettings.shortBreak },
    longBreak: { label: "Long Break", duration: timerSettings.longBreak },
  };

  // Task data
  const [tasks, setTasks] = useState<Task[]>([
    { name: "design", completed: 3, total: 6, isCompleted: false },
    { name: "FE", completed: 0, total: 4, isCompleted: false },
    { name: "test", completed: 0, total: 1, isCompleted: false },
  ]);

  // Load settings from localStorage on initial mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("pomodoroSettings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings) as TimerSettings;
      setTimerSettings(parsedSettings);
    }

    const savedTasks = localStorage.getItem("pomodoroTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    const savedCompletedSessions = localStorage.getItem("completedSessions");
    if (savedCompletedSessions) {
      setCompletedSessions(Number.parseInt(savedCompletedSessions, 10));
    }

    const savedSelectedTaskIndex = localStorage.getItem("selectedTaskIndex");
    if (savedSelectedTaskIndex) {
      setSelectedTaskIndex(Number.parseInt(savedSelectedTaskIndex, 10));
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isInitialMount.current) {
      localStorage.setItem("pomodoroSettings", JSON.stringify(timerSettings));
    } else {
      isInitialMount.current = false;
    }
  }, [timerSettings]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("pomodoroTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save selected task index
  useEffect(() => {
    if (selectedTaskIndex !== null) {
      localStorage.setItem("selectedTaskIndex", selectedTaskIndex.toString());
    } else {
      localStorage.removeItem("selectedTaskIndex");
    }
  }, [selectedTaskIndex]);

  // Calculate total seconds for the current mode
  const getTotalSeconds = () => modes[mode].duration * 60;

  // Calculate current seconds remaining
  const getCurrentSeconds = () => time.minutes * 60 + time.seconds;

  // Handle timer completion
  const handleTimerComplete = () => {
    if (mode === "focus") {
      // Increment completed sessions counter
      const newCompletedSessions = completedSessions + 1;

      // Check if it's time for a long break
      const shouldTakeLongBreak =
        newCompletedSessions % timerSettings.longBreakInterval === 0;

      // If we've reached the long break interval, reset the counter after setting it
      // This ensures we save the correct count before resetting
      if (shouldTakeLongBreak) {
        setCompletedSessions(0);
        localStorage.setItem("completedSessions", "0");
      } else {
        setCompletedSessions(newCompletedSessions);
        localStorage.setItem(
          "completedSessions",
          newCompletedSessions.toString(),
        );
      }

      // Increment the selected task's completed count if there is a selected task
      if (selectedTaskIndex !== null) {
        const updatedTasks = [...tasks];
        const task = updatedTasks[selectedTaskIndex];

        // Only increment if not already at max
        if (task.completed < task.total) {
          task.completed += 1;

          // Check if task is now completed
          if (task.completed >= task.total) {
            task.isCompleted = true;
          }

          setTasks(updatedTasks);
        }
      }

      // Auto start break if enabled
      if (timerSettings.autoStartBreaks) {
        setMode(shouldTakeLongBreak ? "longBreak" : "shortBreak");
        setIsActive(true);
        setButtonText("Pause");
      } else {
        setIsActive(false);
        setButtonText("Start");
      }
    } else {
      // Coming from a break (short or long)
      // Auto start pomodoro if enabled
      if (timerSettings.autoStartPomodoros) {
        setMode("focus");
        setIsActive(true);
        setButtonText("Pause");
      } else {
        setIsActive(false);
        setButtonText("Start");
      }
    }
  };

  // Update progress whenever time changes
  useEffect(() => {
    const totalSeconds = getTotalSeconds();
    const currentSeconds = getCurrentSeconds();
    const newProgress = (currentSeconds / totalSeconds) * 100;
    setProgress(newProgress);
  }, [time]);

  // Reset timer when mode changes or settings change
  useEffect(() => {
    // Reset timer when mode changes
    setTime({ minutes: modes[mode].duration, seconds: 0 });
    setIsActive(false);
    setButtonText("Start");
    setProgress(100);

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode, timerSettings]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds === 0) {
            if (prevTime.minutes === 0) {
              // Timer completed
              clearInterval(intervalRef.current as NodeJS.Timeout);
              intervalRef.current = null;

              // Handle timer completion
              handleTimerComplete();

              return { minutes: modes[mode].duration, seconds: 0 };
            }
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          }
          return { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };
        });
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
  }, [isActive, mode, timerSettings]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
    setButtonText(isActive ? "Start" : "Pause");
  };

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(selectedTaskIndex === index ? null : index);
  };

  const handleTaskCheckClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Prevent triggering the parent onClick

    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;

    // If marking as completed, set completed to total
    if (updatedTasks[index].isCompleted) {
      updatedTasks[index].completed = updatedTasks[index].total;
    }

    setTasks(updatedTasks);
  };

  const handleSettingsChange = (newSettings: TimerSettings) => {
    setTimerSettings(newSettings);
    // Immediately update the timer if the current mode's duration has changed
    if (mode === "focus" && newSettings.pomodoro !== timerSettings.pomodoro) {
      setTime({ minutes: newSettings.pomodoro, seconds: 0 });
    } else if (
      mode === "shortBreak" &&
      newSettings.shortBreak !== timerSettings.shortBreak
    ) {
      setTime({ minutes: newSettings.shortBreak, seconds: 0 });
    } else if (
      mode === "longBreak" &&
      newSettings.longBreak !== timerSettings.longBreak
    ) {
      setTime({ minutes: newSettings.longBreak, seconds: 0 });
    }
  };

  const handleTaskOptionsClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setEditingTaskIndex(index);
    setIsTaskDialogOpen(true);
  };

  const handleTaskChange = (updatedTask: {
    name: string;
    completed: number;
    total: number;
  }) => {
    if (editingTaskIndex !== null) {
      const newTasks = [...tasks];

      // Preserve the isCompleted status
      const isCompleted =
        updatedTask.completed >= updatedTask.total ||
        newTasks[editingTaskIndex].isCompleted;

      newTasks[editingTaskIndex] = {
        ...updatedTask,
        isCompleted,
      };

      setTasks(newTasks);
    }
  };

  const handleDeleteTask = () => {
    if (editingTaskIndex !== null) {
      const newTasks = tasks.filter((_, index) => index !== editingTaskIndex);
      setTasks(newTasks);
      setIsTaskDialogOpen(false);
      if (selectedTaskIndex === editingTaskIndex) {
        setSelectedTaskIndex(null);
      } else if (
        selectedTaskIndex !== null &&
        selectedTaskIndex > editingTaskIndex
      ) {
        setSelectedTaskIndex(selectedTaskIndex - 1);
      }
    }
  };

  // Calculate circle properties
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const getTypographyStyles = () => ({
    fontFamily: "'Baloo 2', sans-serif",
    fontWeight: 600,
    color: "#4B4E6D",
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center p-6">
      <div className="mb-10 flex w-full items-center justify-between">
        <Typography variant="h4" sx={getTypographyStyles()}>
          Pomodoro
        </Typography>
        <button
          className="p-2 text-slate-700"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Edit size={38} />
        </button>
      </div>

      <div className="mb-15 flex w-full gap-2">
        {Object.entries(modes).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setMode(key as "focus" | "shortBreak" | "longBreak")}
            className={`flex-1 rounded-full px-4 py-3 font-['Baloo_2',sans-serif] text-lg font-semibold transition-colors ${
              mode === key
                ? "bg-[#FFF2F2] text-[#4B4E6D]"
                : "text-[#4B4E6D] hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative mb-15 flex h-74 w-74 items-center justify-center">
        {/* SVG for progress circle */}
        <svg
          className="absolute h-full w-full -rotate-90"
          viewBox="0 0 256 256"
        >
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r={radius}
            fill="none"
            stroke="#f1f1f1"
            strokeWidth="8"
          />
          {/* Progress circle */}
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

        {/* Timer text */}
        <div className="z-10">
          <span className="font-['Baloo_2',sans-serif] text-7xl font-bold">
            {formatTime(time.minutes, time.seconds)}
          </span>
        </div>
      </div>

      {/* Session counter */}
      <div className="mb-4 text-center">
        <span className="font-['Baloo_2',sans-serif] text-sm text-[#4B4E6D]">
          Sessions: {completedSessions} / {timerSettings.longBreakInterval}
        </span>
      </div>

      <button
        onClick={toggleTimer}
        className="mb-12 rounded-md border border-slate-300 bg-white px-12 py-3 font-['Baloo_2',sans-serif] text-2xl font-semibold text-slate-600 shadow-md transition-all hover:shadow-lg active:translate-y-1 active:shadow-sm"
      >
        {buttonText}
      </button>

      {/* Tasks Section */}
      <div className="w-full max-w-xl">
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-2">
          <h2 className="font-['Baloo_2',sans-serif] text-2xl font-semibold text-[#4B4E6D]">
            Tasks
          </h2>
          <button className="rounded-lg p-2 text-[#4B4E6D]">
            <MoreVertical className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div
              key={index}
              onClick={() => handleTaskClick(index)}
              className={`flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 ${
                task.isCompleted ? "bg-gray-50" : "bg-white"
              } p-4 shadow-sm transition-all ${
                selectedTaskIndex === index
                  ? "translate-y-0.5 border-l-4 border-l-black bg-gray-50 shadow-inner"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleTaskCheckClick(e, index)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    task.isCompleted
                      ? "bg-red-500"
                      : "border-2 border-gray-300 hover:border-red-400"
                  }`}
                >
                  {task.isCompleted ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <CheckCircle
                      className={`h-6 w-6 ${selectedTaskIndex === index ? "text-[#4B4E6D]" : "text-gray-300"}`}
                    />
                  )}
                </button>
                <span
                  className={`font-['Baloo_2',sans-serif] text-lg ${
                    task.isCompleted
                      ? "text-gray-400 line-through"
                      : "text-[#4B4E6D]"
                  }`}
                >
                  {task.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-['Baloo_2',sans-serif] text-lg text-gray-500">
                  {task.completed}/{task.total}
                </span>
                <button
                  className="rounded p-1 hover:bg-gray-200"
                  onClick={(e) => handleTaskOptionsClick(e, index)}
                >
                  <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* 
        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#4B4E6D]/30 py-4 text-[#4B4E6D] transition-colors hover:bg-[#4B4E6D]/5">
          <Plus className="h-5 w-5" />
          <span className="font-['Baloo_2',sans-serif] text-lg">Add Task</span>
        </button> */}
      </div>

      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        settings={timerSettings}
        onSettingsChange={handleSettingsChange}
      />

      {editingTaskIndex !== null && (
        <TaskDialog
          open={isTaskDialogOpen}
          onOpenChange={setIsTaskDialogOpen}
          task={tasks[editingTaskIndex]}
          onTaskChange={handleTaskChange}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default Pomodoro;
