import { createSlice } from "@reduxjs/toolkit";

interface PremiumState {
  selected: "month" | "half-year" | "year" | null;
}

const initialState: PremiumState = {
  selected: "year",
};

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    selectPlan: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { selectPlan } = premiumSlice.actions;
export default premiumSlice.reducer;
