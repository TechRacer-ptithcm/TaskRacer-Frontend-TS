import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './task.slice';

type EventForDialog = Pick<Task, "id" | "title" | "start" | "priority">;

interface RemainingEventsDialogState {
  isOpen: boolean;
  events: EventForDialog[];
  date: string | null;
}

const initialState: RemainingEventsDialogState = {
  isOpen: false,
  events: [],
  date: null,
};

const remainingEventsDialogSlice = createSlice({
  name: 'remainingEventsDialog',
  initialState,
  reducers: {
    openRemainingEventsDialog: (state, action: PayloadAction<{ events: EventForDialog[]; date: string }>) => {
      state.isOpen = true;
      state.events = action.payload.events;
      state.date = action.payload.date;
    },
    closeRemainingEventsDialog: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { openRemainingEventsDialog, closeRemainingEventsDialog } = remainingEventsDialogSlice.actions;
export default remainingEventsDialogSlice.reducer;