import { Button } from "@/components/ui/button";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { vi } from "date-fns/locale";
import { FaCaretDown } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface DateDisplayPickerProps {
  viewMode: "day" | "week" | "month";
  vietnameseDate: string;
  vietnameseWeek: string;
  vietnameseMonth: string;
  weekdayLabels: string[];
  selectedDate: string | null;
  onDateSelect: (date: Date | undefined) => void;
}

const DateDisplayPicker = ({
  viewMode,
  vietnameseDate,
  vietnameseWeek,
  vietnameseMonth,
  selectedDate,
  onDateSelect,
}: DateDisplayPickerProps) => {
  const displayValue =
    viewMode === "day"
      ? vietnameseDate
      : viewMode === "week"
        ? vietnameseWeek
        : vietnameseMonth;

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full px-4 py-2 font-['Baloo_2',sans-serif] text-xl font-semibold text-black hover:bg-gray-100"
        >
          {displayValue}
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
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
            <DateCalendar
              value={selectedDate ? new Date(selectedDate) : null}
              onChange={(newDate) => onDateSelect(newDate || undefined)}
              className="rounded-3xl"
            />
          </LocalizationProvider>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export default DateDisplayPicker;