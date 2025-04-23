import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ViewMode = 'day' | 'week' | 'month';

type ViewPage = 'calendar' | 'todo';

interface ViewModeState {
  selectedViewMode: ViewMode;
  selectedViewPage: ViewPage;
}

const initialState: ViewModeState = {
  selectedViewMode: 'month',
  selectedViewPage: 'calendar',
};

const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.selectedViewMode = action.payload;
    },
    setViewPage: (state, action: PayloadAction<ViewPage>) => {
      state.selectedViewPage = action.payload;
    },
  },
});

export const { setViewMode, setViewPage } = viewModeSlice.actions;
export default viewModeSlice.reducer;