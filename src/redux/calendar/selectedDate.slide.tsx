import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentDate, formatVietnameseDate } from "@/utils/date";
import dayjs from "dayjs";

const currentDate = getCurrentDate();

const initialState = {
  selectedDate: currentDate,
  vietnameseDate: formatVietnameseDate(currentDate),
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload;
      state.vietnameseDate = formatVietnameseDate(action.payload);
    },
    resetToCurrentDate: (state) => {
        const currentDate = getCurrentDate();
        state.selectedDate = currentDate;
        state.vietnameseDate = formatVietnameseDate(currentDate);
      },
      nextDate: (state) => {
        const nextDate = dayjs(state.selectedDate).add(1, "day").toDate();
        state.selectedDate = nextDate;
        state.vietnameseDate = formatVietnameseDate(nextDate);
      },
      prevDate: (state) => {
        const prevDate = dayjs(state.selectedDate).subtract(1, "day").toDate();
        state.selectedDate = prevDate;
        state.vietnameseDate = formatVietnameseDate(prevDate);
      },
  },
});

export const { setSelectedDate, resetToCurrentDate, nextDate, prevDate} = dateSlice.actions;
export default dateSlice.reducer;
