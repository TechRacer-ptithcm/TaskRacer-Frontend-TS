import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  currentPage: "calendar" | "dashboard" | "pomodoro" | "profile";
}

const initialState: PageState = {
  currentPage: "dashboard",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<PageState["currentPage"]>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
