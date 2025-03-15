import Typography from "@mui/material/Typography";
import { useState, useEffect, useRef } from "react";
import { Edit, MoreVertical, Plus, CheckCircle } from "lucide-react";
import "@fontsource/baloo-2";
import { SettingsDialog } from "@/components/ui/setting-pomodoro";

const Pomodoro = () => {
  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">(
    "focus",
  );
  const [time, setTime] = useState({ minutes: 25, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [progress, setProgress] = useState(100);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null,
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const modes = {
    focus: { label: "Focus", duration: 25 },
    shortBreak: { label: "Short Break", duration: 5 },
    longBreak: { label: "Long Break", duration: 15 },
  };

  // Task data
  const tasks = [
    { name: "design", completed: 3, total: 6 },
    { name: "FE", completed: 0, total: 4 },
    { name: "test", completed: 0, total: 1 },
  ];

  // Calculate total seconds for the current mode
  const getTotalSeconds = () => modes[mode].duration * 60;

  // Calculate current seconds remaining
  const getCurrentSeconds = () => time.minutes * 60 + time.seconds;

  // Update progress whenever time changes
  useEffect(() => {
    const totalSeconds = getTotalSeconds();
    const currentSeconds = getCurrentSeconds();
    const newProgress = (currentSeconds / totalSeconds) * 100;
    setProgress(newProgress);
  }, [time]);

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
  }, [mode]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds === 0) {
            if (prevTime.minutes === 0) {
              // Timer completed
              setIsActive(false);
              setButtonText("Start");
              clearInterval(intervalRef.current as NodeJS.Timeout);
              intervalRef.current = null;
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
  }, [isActive, mode]);

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
              className={`flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all ${
                selectedTaskIndex === index
                  ? "translate-y-0.5 border-l-4 border-l-black bg-gray-50 shadow-inner"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle
                  className={`h-6 w-6 ${selectedTaskIndex === index ? "text-[#4B4E6D]" : "text-gray-300"}`}
                />
                <span className="font-['Baloo_2',sans-serif] text-lg text-[#4B4E6D]">
                  {task.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-['Baloo_2',sans-serif] text-lg text-gray-500">
                  {task.completed}/{task.total}
                </span>
                <button
                  className="rounded p-1 hover:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                  }}
                >
                  <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#4B4E6D]/30 py-4 text-[#4B4E6D] transition-colors hover:bg-[#4B4E6D]/5">
          <Plus className="h-5 w-5" />
          <span className="font-['Baloo_2',sans-serif] text-lg">Add Task</span>
        </button>
      </div>

      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </div>
  );
};

export default Pomodoro;
