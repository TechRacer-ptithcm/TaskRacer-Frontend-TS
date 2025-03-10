import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ViewMode = 'day' | 'week' | 'month';

interface ViewModeState {
  selectedViewMode: ViewMode;
}

const initialState: ViewModeState = {
  selectedViewMode: 'day',
};

const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.selectedViewMode = action.payload;
    },
  },
});

export const { setViewMode } = viewModeSlice.actions;
export default viewModeSlice.reducer;
