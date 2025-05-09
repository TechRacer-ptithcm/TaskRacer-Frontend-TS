import { RootState } from "../../store";

export const selectPomodoroSettings = (state: RootState) => state.pomodoro.settings;
export const selectPomodoroMode = (state: RootState) => state.pomodoro.mode;
export const selectPomodoroTime = (state: RootState) => state.pomodoro.time;
export const selectPomodoroIsActive = (state: RootState) => state.pomodoro.isActive;