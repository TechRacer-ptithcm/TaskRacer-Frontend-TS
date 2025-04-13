import { IconButton } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";

interface ScheduleItemProps {
  title: string;
  time: string;
}

const ScheduleItem = ({ title, time }: ScheduleItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex-1">
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-red-600"></div>
        <div className="ml-6 rounded-lg bg-white p-3 shadow-sm">
          <div className="flex justify-between">
            <h4 className="font-['Baloo_2',sans-serif] font-bold">{title}</h4>
            <IconButton size="small">
              <MoreHoriz fontSize="small" />
            </IconButton>
          </div>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
