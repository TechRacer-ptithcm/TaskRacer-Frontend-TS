import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { Task } from "../calendar/task.slice";

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
    buttonText: "Start" | "Pause";
    progress: number;
    completedSessions: number;
  }
  
  const initialState: PomodoroState = {
    settings: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      longBreakInterval: 4,
    },
    mode: "focus",
    time: { minutes: 25, seconds: 0 },
    isActive: false,
    buttonText: "Start",
    progress: 100,
    completedSessions: 0,
  };

  export const updateTask = createAsyncThunk(
    "content/updateTask",
    async (
      task: Task,
      { rejectWithValue }: { rejectWithValue: (value: unknown) => void }
    ) => {
      try {
        const response = await axios.put(`${API_URL}/content/task`, task);
        return response.data;
      } catch (error) {
        return rejectWithValue(
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
            "Update task failed"
        );
      }
    }
  );
  
  const pomodoroSlice = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
      setSettings(state, action: PayloadAction<Partial<TimerSettings>>) {
        Object.assign(state.settings, action.payload);
      },
      changePomodoro(state, action: PayloadAction<string>) {
        state.settings.pomodoro = parseInt(action.payload) || 0;
      },
      changeShortBreak(state, action: PayloadAction<string>) {
        state.settings.shortBreak = parseInt(action.payload) || 0;
      },
      changeLongBreak(state, action: PayloadAction<string>) {
        state.settings.longBreak = parseInt(action.payload) || 0;
      },
      changeLongBreakInterval(state, action: PayloadAction<string>) {
        state.settings.longBreakInterval = parseInt(action.payload) || 0;
      },
      toggleAutoStartBreaks(state) {
        state.settings.autoStartBreaks = !state.settings.autoStartBreaks;
      },
      toggleAutoStartPomodoros(state) {
        state.settings.autoStartPomodoros = !state.settings.autoStartPomodoros;
      },
  
      setMode(state, action: PayloadAction<"focus" | "shortBreak" | "longBreak">) {
        state.mode = action.payload;
      },
      setTime(state, action: PayloadAction<{ minutes: number; seconds: number }>) {
        state.time = action.payload;
      },
      setIsActive(state, action: PayloadAction<boolean>) {
        state.isActive = action.payload;
      },
      setButtonText(state, action: PayloadAction<"Start" | "Pause">) {
        state.buttonText = action.payload;
      },
      setProgress(state, action: PayloadAction<number>) {
        state.progress = action.payload;
      },
      setCompletedSessions(state, action: PayloadAction<number>) {
        state.completedSessions = action.payload;
      },
      resetPomodoroState(state) {
        state.time = {
          minutes: state.settings.pomodoro,
          seconds: 0,
        };
        state.mode = "focus";
        state.isActive = false;
        state.buttonText = "Start";
        state.progress = 100;
        state.completedSessions = 0;
      },
    },
  });
  
  export const {
    setSettings,
    changePomodoro,
    changeShortBreak,
    changeLongBreak,
    changeLongBreakInterval,
    toggleAutoStartBreaks,
    toggleAutoStartPomodoros,
    setMode,
    setTime,
    setIsActive,
    setButtonText,
    setProgress,
    setCompletedSessions,
    resetPomodoroState,
  } = pomodoroSlice.actions;
  
  export default pomodoroSlice.reducer;
  