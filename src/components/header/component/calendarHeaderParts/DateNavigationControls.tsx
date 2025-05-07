import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface DateNavigationControlsProps {
  onResetToCurrentDate: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const DateNavigationControls = ({
  onResetToCurrentDate,
  onPrev,
  onNext,
}: DateNavigationControlsProps) => {
  return (
    <>
      <button
        onClick={onResetToCurrentDate}
        className="cursor-pointer rounded-full border border-[#888] bg-white px-3 py-1 font-['Baloo_2',sans-serif] text-xl font-semibold transition-all hover:shadow-md"
      >
        Hôm nay
      </button>
      <IconButton onClick={onPrev}>
        <ChevronLeft />
      </IconButton>
      <IconButton onClick={onNext}>
        <ChevronRight />
      </IconButton>
    </>
  );
};

export default DateNavigationControls;