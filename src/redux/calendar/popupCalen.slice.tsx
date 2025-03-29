import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
const API_URL = import.meta.env.VITE_API_URL;

interface PopupState {
  isOpen: boolean;
  selectedDate: dayjs.Dayjs | null;
  isSetTime: boolean;
  startTime: string | null;
  endTime: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED" | null;
  priority: "LOW" | "MEDIUM" | "HIGH" | null;
  description: string | null;
  title: string | null;
}

const initialState: PopupState = {
  isOpen: false,
  selectedDate: null,
  isSetTime: false,
  startTime: null,
  endTime: null,
  status: null,
  priority: null,
  description: null,
  title: null,
};

export const createTask = createAsyncThunk(
  "task/create",
  async (
    {
      title,
      priority,
      description,
      startAt,
      dueAt,
      status,
    }: {
      title: string;
      priority: "LOW" | "MEDIUM" | "HIGH";
      description: string;
      startAt: string;
      dueAt: string;
      status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}content/task`, {
        type: "USER",
        content: title,
        priority,
        description,
        startAt,
        dueAt,
        status,
      });
      console.log("✅ Task created:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Create task failed:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Đã có lỗi xảy ra");
    }
  }
);

const popupCalenSlice = createSlice({
  name: "popupCalen",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<string>) => {
      const selected = dayjs(action.payload);
      state.isOpen = true;
      state.selectedDate = selected;
      state.startTime = selected.hour(11).minute(0).format("HH:mm");
      state.endTime = selected.hour(12).minute(0).format("HH:mm");
    },
    close: (state) => {
      state.isOpen = false;
      state.selectedDate = null;
      state.isSetTime = false;
      state.startTime = null;
      state.endTime = null;
      state.priority = null;
      state.status = null;
    },
    setTime: (state, action: PayloadAction<boolean>) => {
      state.isSetTime = action.payload;
    },
    setStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<"TODO" | "IN_PROGRESS" | "DONE" | "CANCELED">,
    ) => {
      state.status = action.payload;
    },
    setPriority: (state, action: PayloadAction<"LOW" | "MEDIUM" | "HIGH">) => {
      state.priority = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },    
  },
});

export const {
  open,
  close,
  setTime,
  setStartTime,
  setEndTime,
  setPriority,
  setStatus,
  setDescription,
  setTitle,
} = popupCalenSlice.actions;
export default popupCalenSlice.reducer;
