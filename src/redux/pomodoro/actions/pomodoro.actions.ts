import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkpointPomodoro, getStartTime, startPomodoro, stopPomodoro } from "../services/pomodoro.service";
import { PomodoroState } from "../types/pomodoro.types";

export const getStartTimeThunk = createAsyncThunk(
  "pomodoro/getStartTime",
  async (_, { rejectWithValue }) => {
    try {
      return await getStartTime();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const startPomodoroThunk = createAsyncThunk(
  "pomodoro/start",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { pomodoro: PomodoroState };
      return await startPomodoro(state.pomodoro);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const stopPomodoroThunk = createAsyncThunk(
  "pomodoro/stop",
  async (_, { rejectWithValue }) => {
    try {
      return await stopPomodoro();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const checkpointPomodoroThunk = createAsyncThunk(
  "pomodoro/checkpoint",
  async (_, { rejectWithValue }) => {
    try {
      return await checkpointPomodoro();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const startCheckpointSaga = createAsyncThunk(
  'pomodoro/startCheckpointSaga',
  async (_, { dispatch }) => {
    dispatch(checkpointPomodoroThunk());
  }
);