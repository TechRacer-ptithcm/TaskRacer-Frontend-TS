import { Box, IconButton, Menu, MenuItem } from "@mui/material";
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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { motion } from 'framer-motion';
import { FaCaretDown } from "react-icons/fa";
import { Calendar } from "../ui/calendar";
import { vi } from "date-fns/locale";
import { setSelectedDate } from "@/redux/calendar/selectedDate.slide";

const CalendarHeader = () => {
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
  const selectedDate = useSelector((state: RootState) => state.selectedDate.selectedDate);

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
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-full px-4 py-2 font-['Baloo_2',sans-serif] text-xl font-semibold text-black hover:bg-gray-100"
          >
            {viewMode === "day"
              ? vietnameseDate
              : viewMode === "week"
                ? vietnameseWeek
                : vietnameseMonth}
            <FaCaretDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[9999] w-auto rounded-md bg-white p-2 shadow-lg"
          align="center"
          side="bottom"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Calendar
              mode="single"
              locale={vi}
              formatters={{
                formatWeekdayName: (weekday) => weekdayLabels[weekday.getDay()],
              }}
              selected={selectedDate ? new Date(selectedDate) : undefined}
              onSelect={(date) => {
                if (date instanceof Date) {
                  dispatch(setSelectedDate(date.toISOString()));
                }
              }}              
              className="rounded-3xl"
            />
          </motion.div>
        </PopoverContent>
      </Popover>

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
