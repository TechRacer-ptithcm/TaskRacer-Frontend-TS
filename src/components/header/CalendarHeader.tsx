import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setViewMode } from "@/redux/calendar/ViewMode";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  nextDate,
  prevDate,
  nextMonth,
  prevMonth,
  nextWeek,
  prevWeek,
  resetToCurrentDate,
} from "@/redux/calendar/selectedDate.slide";

const CalendarHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const viewMode = useSelector(
    (state: RootState) => state.viewMode.selectedViewMode,
  );
  const { vietnameseDate, vietnameseMonth, vietnameseWeek } = useSelector(
    (state: RootState) => state.selectedDate,
  );

  const dispatch = useDispatch();

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

  return (
    <Box display="flex" alignItems="center" px={2}>
      <button
        onClick={() => dispatch(resetToCurrentDate())}
        className="cursor-pointer rounded-full border border-[#888] bg-white px-3 py-1 font-['Baloo_2',sans-serif] text-xl font-semibold transition-all hover:shadow-md"
      >
        Hôm nay
      </button>
      <IconButton onClick={handlePrev}>
        <ChevronLeft />
      </IconButton>
      <IconButton onClick={handleNext}>
        <ChevronRight />
      </IconButton>
      <Typography variant="h6" sx={{ mx: 2 }}>
        {viewMode === "day"
          ? vietnameseDate
          : viewMode === "week"
            ? vietnameseWeek
            : vietnameseMonth}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <button
          onClick={handleMenuClick}
          className="cursor-pointer rounded-full border border-[#888] bg-white px-3 py-1 font-['Baloo_2',sans-serif] text-xl font-semibold transition-all hover:shadow-md"
        >
          {viewMode === "day" ? "Ngày" : viewMode === "week" ? "Tuần" : "Tháng"}
        </button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(setViewMode("day"));
              handleMenuClose();
            }}
          >
            Ngày
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setViewMode("week"));
              handleMenuClose();
            }}
          >
            Tuần
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setViewMode("month"));
              handleMenuClose();
            }}
          >
            Tháng
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default CalendarHeader;
