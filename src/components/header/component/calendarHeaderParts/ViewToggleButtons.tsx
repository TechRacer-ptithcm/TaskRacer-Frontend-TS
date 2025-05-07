import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, CheckCircle } from "lucide-react";

interface ViewToggleButtonsProps {
  onCalendarClick: () => void;
  onTodoClick: () => void;
}

const ViewToggleButtons = ({
  onCalendarClick,
  onTodoClick,
}: ViewToggleButtonsProps) => {
  return (
    <div className="inline-flex overflow-hidden rounded-full border border-[#888] bg-white shadow-sm">
      <Button
        variant="ghost"
        onClick={onCalendarClick}
        className="rounded-none px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      >
        <CalendarIcon className="h-5 w-5" />
      </Button>
      <div className="w-px bg-gray-200"></div>
      <Button
        variant="ghost"
        onClick={onTodoClick}
        className="rounded-none px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      >
        <CheckCircle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ViewToggleButtons;