export interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
}

export interface PomodoroState {
  settings: TimerSettings;
  mode: "focus" | "shortBreak" | "longBreak";
  time: { minutes: number; seconds: number };
  isActive: boolean;
  buttonText: "Start" | "Stop";
  progress: number;
  completedSessions: number;
}