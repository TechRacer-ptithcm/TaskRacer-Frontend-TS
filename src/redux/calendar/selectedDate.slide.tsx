import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCurrentDate,
  formatVietnameseDate,
  formatVietnameseMonth,
  formatVietnameseWeek,
} from "@/utils/date";
import dayjs from "dayjs";

const currentDate = getCurrentDate().toISOString();

const initialState = {
  selectedDate: currentDate,
  vietnameseDate: formatVietnameseDate(new Date(currentDate)),
  vietnameseMonth: formatVietnameseMonth(new Date(currentDate)),
  vietnameseWeek: formatVietnameseWeek(new Date(currentDate)),
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
      state.vietnameseDate = formatVietnameseDate(new Date(action.payload));
    },
    resetToCurrentDate: (state) => {
      const currentDate = getCurrentDate().toISOString();
      state.selectedDate = currentDate;
      state.vietnameseDate = formatVietnameseDate(new Date(currentDate));
    },
    nextDate: (state) => {
      const nextDate = dayjs(state.selectedDate).add(1, "day").toISOString();
      state.selectedDate = nextDate;
      state.vietnameseDate = formatVietnameseDate(new Date(nextDate));
    },
    prevDate: (state) => {
      const prevDate = dayjs(state.selectedDate).subtract(1, "day").toISOString();
      state.selectedDate = prevDate;
      state.vietnameseDate = formatVietnameseDate(new Date(prevDate));
    },
    nextMonth: (state) => {
      const nextMonth = dayjs(state.selectedDate).add(1, "month").toISOString();
      state.selectedDate = nextMonth;
      state.vietnameseDate = formatVietnameseDate(new Date(nextMonth));
      state.vietnameseMonth = formatVietnameseMonth(new Date(nextMonth));
    },
    prevMonth: (state) => {
      const prevMonth = dayjs(state.selectedDate).subtract(1, "month").toISOString();
      state.selectedDate = prevMonth;
      state.vietnameseDate = formatVietnameseDate(new Date(prevMonth));
      state.vietnameseMonth = formatVietnameseMonth(new Date(prevMonth));
    },
    nextWeek: (state) => {
      const nextWeek = dayjs(state.selectedDate).add(1, "week").toISOString();
      state.selectedDate = nextWeek;
      state.vietnameseDate = formatVietnameseDate(new Date(nextWeek));
    },
    
    prevWeek: (state) => {
      const prevWeek = dayjs(state.selectedDate).subtract(1, "week").toISOString();
      state.selectedDate = prevWeek;
      state.vietnameseDate = formatVietnameseDate(new Date(prevWeek));
    },    
  },
});

export const {
  setSelectedDate,
  resetToCurrentDate,
  nextDate,
  prevDate,
  nextMonth,
  prevMonth,
  nextWeek,
  prevWeek,
} = dateSlice.actions;
export default dateSlice.reducer;
