import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/taskTypes";

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
    },
  },
});

export const { openSummaryPopup, closeSummaryPopup } = popupSummarySlice.actions;
export default popupSummarySlice.reducer;
