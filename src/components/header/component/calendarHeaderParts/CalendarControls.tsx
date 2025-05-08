import { Box } from "@mui/material";
import DateNavigationControls from "./DateNavigationControls";
import DateDisplayPicker from "./DateDisplayPicker";
import ViewModeSwitcher from "./ViewModeSwitcher";
import ViewToggleButtons from "./ViewToggleButtons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { setViewMode, setViewPage } from "@/redux/calendar/ViewMode";
import {
  nextDate,
  prevDate,
  nextMonth,
  prevMonth,
  nextWeek,
  prevWeek,
  resetToCurrentDate,
  setSelectedDate,
} from "@/redux/calendar/selectedDate.slide";

interface CalendarControlsProps {}

const CalendarControls: React.FC<CalendarControlsProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const weekdayLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const viewMode = useSelector(
    (state: RootState) => state.viewMode.selectedViewMode,
  );
  const { vietnameseDate, vietnameseMonth, vietnameseWeek } = useSelector(
    (state: RootState) => state.selectedDate,
  );
  const selectedDateVal = useSelector(
    (state: RootState) => state.selectedDate.selectedDate,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCalendarClick = () => {
    dispatch(setViewPage("calendar"));
    navigate("/home/calendar");
  };

  const handleTodoClick = () => {
    dispatch(setViewPage("todo")); 
    navigate("/home/todo");
  };

  const handlePrev = () => {
    if (viewMode === "day") dispatch(prevDate());
    else if (viewMode === "week") dispatch(prevWeek());
    else dispatch(prevMonth());
  };

  const handleNext = () => {
    if (viewMode === "day") dispatch(nextDate());
    else if (viewMode === "week") dispatch(nextWeek());
    else dispatch(nextMonth());
  };

  const handleResetToCurrentDate = () => {
    dispatch(resetToCurrentDate());
  };

  const handleDateSelectInPicker = (date: Date | undefined) => {
    if (date instanceof Date) {
      dispatch(setSelectedDate(date.toISOString()));
    }
  };

  const handleSetViewMode = (mode: "day" | "week" | "month") => {
    dispatch(setViewMode(mode));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width={700}
    >
      <DateNavigationControls
        onResetToCurrentDate={handleResetToCurrentDate}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      {/* <DateDisplayPicker
        viewMode={viewMode}
        vietnameseDate={vietnameseDate}
        vietnameseWeek={vietnameseWeek}
        vietnameseMonth={vietnameseMonth}
        weekdayLabels={weekdayLabels}
        selectedDate={selectedDateVal}
        onDateSelect={handleDateSelectInPicker}
      /> */}
      <ViewModeSwitcher
        viewMode={viewMode}
        anchorEl={anchorEl}
        onMenuClick={handleMenuClick}
        onMenuClose={handleMenuClose}
        onSetViewMode={handleSetViewMode}
      />
      <ViewToggleButtons
        onCalendarClick={handleCalendarClick}
        onTodoClick={handleTodoClick}
      />
    </Box>
  );
};

export default CalendarControls;
