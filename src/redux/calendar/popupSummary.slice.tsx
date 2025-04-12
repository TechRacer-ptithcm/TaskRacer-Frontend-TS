import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "./task.slice";

export interface PopupSummaryState {
  isOpen: boolean;
  task: Task | null;
}

const initialState: PopupSummaryState = {
  isOpen: false,
  task: null,
};

const popupSummarySlice = createSlice({
  name: "popupSummary",
  initialState,
  reducers: {
    openSummaryPopup(state, action: PayloadAction<Task>) {
      state.isOpen = true;
      state.task = action.payload;
    },
    closeSummaryPopup(state) {
      state.isOpen = false;
      state.task = null;
    },
  },
});

export const { openSummaryPopup, closeSummaryPopup } = popupSummarySlice.actions;
export default popupSummarySlice.reducer;
