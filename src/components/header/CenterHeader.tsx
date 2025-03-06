import { Button } from "../ui/button";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { useClickOutside } from "../../utils/click";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDate,
  resetToCurrentDate,
  nextDate,
  prevDate,
} from "../../redux/calendar/selectedDate.slide";
import { RootState } from "../../redux/store";

export default function CenterHeader() {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useClickOutside(() => setShowCalendar(false));

  const dispatch = useDispatch();
  const selectedDate =
    useSelector((state: RootState) => state.selectedDate.selectedDate) ||
    new Date();

  const vietnameseDate = useSelector(
    (state: RootState) => state.selectedDate.vietnameseDate,
  );

  return (
    <div className="relative flex items-center gap-4 p-4">
      <Button
        variant="outline"
        className="rounded-3xl px-4 py-2 hover:cursor-pointer"
        onClick={() => dispatch(resetToCurrentDate())}
      >
        Hôm nay
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="rounded-full p-2 hover:cursor-pointer"
          onClick={() => dispatch(prevDate())}
        >
          <MdKeyboardArrowLeft />
        </Button>
        <Button
          variant="ghost"
          className="rounded-full p-2 hover:cursor-pointer"
          onClick={() => dispatch(nextDate())}
        >
          <MdKeyboardArrowRight />
        </Button>
      </div>
      <div className="relative">
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full p-2 hover:cursor-pointer"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {vietnameseDate}
          <FaCaretDown />
        </Button>
        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute right-0 z-10 mt-2 rounded-md bg-white p-2 shadow-lg"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date instanceof Date) {
                  dispatch(setSelectedDate(date));
                  setShowCalendar(false);
                }
              }}
              className="rounded-md border"
            />
          </div>
        )}
      </div>
    </div>
  );
}
