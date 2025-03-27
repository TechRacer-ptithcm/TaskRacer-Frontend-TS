import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface PopupState {
  isOpen: boolean;
  selectedDate: dayjs.Dayjs | null;
  isSetTime: boolean;
  startTime: string | null;
  endTime: string | null;
}

const initialState: PopupState = {
  isOpen: false,
  selectedDate: null,
  isSetTime: false,
  startTime: null,
  endTime: null,
};

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
  },
});

export const { open, close, setTime, setStartTime, setEndTime } = popupCalenSlice.actions;
export default popupCalenSlice.reducer;
