import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface PopupState {
  isOpen: boolean;
  isEditOpen: boolean;
  selectedDate: string | null;
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
  isEditOpen: false,
  selectedDate: null,
  isSetTime: false,
  startTime: null,
  endTime: null,
  status: null,
  priority: null,
  description: null,
  title: null,
};

const popupCalenSlice = createSlice({
  name: "popupCalen",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<string>) => {
      const selected = dayjs(action.payload);
      state.isOpen = true;
      state.selectedDate = selected.toISOString();
      state.startTime = selected.hour(11).minute(0).format("HH:mm");
      state.endTime = selected.hour(12).minute(0).format("HH:mm");
    },
    close: (state) => {
      Object.assign(state, initialState);
    },
    openEdit: (state) => {
      state.isEditOpen = true;
    },    
    closeEdit: (state) => {
      state.isEditOpen = false;
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
  openEdit,
  closeEdit,
} = popupCalenSlice.actions;
export default popupCalenSlice.reducer;
