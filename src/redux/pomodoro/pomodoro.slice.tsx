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

export const getStartTime = createAsyncThunk(
  "pomodoro/getStartTime",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}pomodoro`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đã có lỗi xảy ra khi lấy thời gian bắt đầu");
    }
  }
);

export const startPomodoro = createAsyncThunk(
  "pomodoro/start",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { pomodoro: PomodoroState };
      const minutes = state.pomodoro.settings.pomodoro;
      const endTime = Math.floor(Date.now() / 1000) + minutes * 60;

      const response = await axios.post(`${API_URL}pomodoro/start`, 
        { endTime },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
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
      .addCase(getStartTime.fulfilled, (state, action) => {
        if (action.payload.code === "000000" && action.payload.data) {
          const now = Math.floor(Date.now() / 1000);
          const { startTime, endTime } = action.payload.data;
          
          if (startTime && endTime && now < endTime) {
            const remainingSeconds = endTime - now;
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            
            state.time = { minutes, seconds };
            state.isActive = true;
            state.buttonText = "Pause";
          }
        }
      })
      .addCase(getStartTime.rejected, (state, action) => {
        console.error("Failed to get start time:", action.payload);
      })
      .addCase(startPomodoro.fulfilled, (state, action) => {
        console.log("Pomodoro started successfully");
      })
      .addCase(startPomodoro.rejected, (state, action) => {
        console.error("Failed to start pomodoro:", action.payload);
      })
      .addCase(stopPomodoro.fulfilled, (state, action) => {
        state.buttonText = "Start";
        state.isActive = false;
        
        // Tính toán thời gian còn lại từ startTime đến endTime
        if (action.payload.code === "000000" && action.payload.data) {
          const { startTime, endTime } = action.payload.data;
          if (startTime && endTime) {
            const remainingSeconds = endTime - startTime;
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            state.time = { minutes, seconds };
          }
        }
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
  