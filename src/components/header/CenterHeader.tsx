import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { Calendar } from "../ui/calendar";
import { vi } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDate,
  resetToCurrentDate,
  nextDate,
  prevDate,
} from "../../redux/calendar/selectedDate.slide";
import { RootState } from "../../redux/store";
import CreateTask from "../sidebar/CreateTask";
import { motion } from "framer-motion";

const weekdayLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export default function CenterHeader() {
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-full p-2 hover:cursor-pointer"
          >
            {vietnameseDate}
            <FaCaretDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto rounded-md bg-white p-2 shadow-lg"
          align="center"
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
              selected={selectedDate}
              onSelect={(date) => {
                if (date instanceof Date) {
                  dispatch(setSelectedDate(date));
                }
              }}
              className="rounded-3xl"
            />
          </motion.div>
        </PopoverContent>
      </Popover>
      <CreateTask />
    </div>
  );
}
