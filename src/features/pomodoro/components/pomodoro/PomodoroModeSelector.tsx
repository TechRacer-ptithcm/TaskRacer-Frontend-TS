import { useAppDispatch, useAppSelector } from "@/redux/store";
import { pomodoroActions } from "@/redux/pomodoro/reducers/pomodoro.reducer";

export const PomodoroModeSelector = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.pomodoro.mode);
  const settings = useAppSelector(state => state.pomodoro.settings);
  const isActive = useAppSelector(state => state.pomodoro.isActive);
  
  const handleModeChange = (key: string) => {
    const isFocusActive = mode === "focus" && isActive;
    if (isFocusActive) {
      dispatch(pomodoroActions.toggleDialogOpen());
    } else {
      dispatch(pomodoroActions.setMode(key as "focus" | "shortBreak" | "longBreak"));
    }
  };

  const modes = {
    focus: { label: "Focus", duration: settings.pomodoro },
    shortBreak: { label: "Short Break", duration: settings.shortBreak },
    longBreak: { label: "Long Break", duration: settings.longBreak },
  };

  return (
    <div className="mb-15 flex w-full gap-2">
      {Object.entries(modes).map(([key, { label }]) => (
        <button
          key={key}
          onClick={() => handleModeChange(key)}
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
  );
};