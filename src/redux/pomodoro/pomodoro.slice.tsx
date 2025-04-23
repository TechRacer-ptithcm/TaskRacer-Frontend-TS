import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

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
    longBreakInterval: 4
  },
  mode: "focus",
  time: { minutes: 25, seconds: 0 },
  isActive: false,
  buttonText: "Start",
  progress: 100,
  completedSessions: 0
};

export const checkpointPomodoro = createAsyncThunk(
  "pomodoro/checkpoint",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}pomodoro/checkpoint`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đã có lỗi xảy ra khi lưu checkpoint");
    }
  }
);

export const startPomodoro = createAsyncThunk(
  "pomodoro/start",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}pomodoro/start`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đã có lỗi xảy ra khi bắt đầu pomodoro");
    }
  }
);

export const stopPomodoro = createAsyncThunk(
  "pomodoro/stop",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}pomodoro/stop`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đã có lỗi xảy ra khi dừng pomodoro");
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
  extraReducers: (builder) => {
    builder
      .addCase(checkpointPomodoro.fulfilled, (state, action) => {
        console.log("Checkpoint saved successfully:", action.payload);
      })
      .addCase(checkpointPomodoro.rejected, (state, action) => {
        console.error("Failed to save checkpoint:", action.payload);
      })
      .addCase(startPomodoro.fulfilled, (state, action) => {
        console.log("Pomodoro started successfully");
      })
      .addCase(startPomodoro.rejected, (state, action) => {
        console.error("Failed to start pomodoro:", action.payload);
      })
      .addCase(stopPomodoro.fulfilled, (state, action) => {
        console.log("Pomodoro stopped successfully");
      })
      .addCase(stopPomodoro.rejected, (state, action) => {
        console.error("Failed to stop pomodoro:", action.payload);
      });
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
  