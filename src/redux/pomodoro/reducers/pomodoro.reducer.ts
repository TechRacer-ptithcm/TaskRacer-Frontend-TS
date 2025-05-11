import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PomodoroState, TimerSettings } from "../types/pomodoro.types";
import { getStartTimeThunk, startPomodoroThunk, stopPomodoroThunk } from "../actions/pomodoro.actions";

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
  completedSessions: 0,
  isSettingsOpen: false,
  isDialogOpen: false
};

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
    setButtonText(state, action: PayloadAction<"Start" | "Stop">) {
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
    toggleSettingsOpen(state) {
      state.isSettingsOpen = !state.isSettingsOpen;
    },
    toggleDialogOpen(state) {
      state.isDialogOpen = !state.isDialogOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStartTimeThunk.fulfilled, (state, action) => {
        if (action.payload.code === "000000" && action.payload.data) {
          const now = Math.floor(Date.now() / 1000);
          const { startTime, endTime } = action.payload.data;
          
          if (startTime && endTime && now < endTime) {
            const remainingSeconds = endTime - now;
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            
            state.time = { minutes, seconds };
            state.isActive = true;
            state.buttonText = "Stop";
          }
        }
      })
      .addCase(getStartTimeThunk.rejected, (_state, _action) => {
        console.error("Failed to get start time:", _action.payload);
      })
      .addCase(startPomodoroThunk.fulfilled, (state, _action) => {
        state.isActive = true;
        state.buttonText = "Stop";
        
        const interval = setInterval(() => {
          const { minutes, seconds } = state.time;
          let updatedTime;
  
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
              // Xử lý khi hết thời gian
              state.isActive = false;
              state.buttonText = "Start";
              return;
            } else {
              updatedTime = { minutes: minutes - 1, seconds: 59 };
            }
          } else {
            updatedTime = { minutes, seconds: seconds - 1 };
          }
  
          state.time = updatedTime;
        }, 1000);
      })
      .addCase(startPomodoroThunk.rejected, (_state, _action) => {
        console.error("Failed to start pomodoro:", _action.payload);
      })
      .addCase(stopPomodoroThunk.fulfilled, (state, action) => {
        state.buttonText = "Start";
        state.isActive = false;
        
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
      .addCase(stopPomodoroThunk.rejected, (_state, _action) => {
        console.error("Failed to stop pomodoro:", _action.payload);
      });
  },
});

export const pomodoroActions = pomodoroSlice.actions;
export default pomodoroSlice.reducer;