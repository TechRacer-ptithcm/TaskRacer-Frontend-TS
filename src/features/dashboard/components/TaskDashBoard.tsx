import { IconButton } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";

interface ScheduleItemProps {
  title: string;
  start: string;
  end: string;
  description: string;
}

const ScheduleItem = ({
  title,
  start,
  end,
  description,
}: ScheduleItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex-1">
        <div className="absolute top-0 left-0 flex h-full w-10 flex-col items-center justify-between py-1 text-[10px] text-gray-500">
          <span>{start.slice(11, 16)}</span>
          <span>{end.slice(11, 16)}</span>
        </div>
        <div className="absolute top-0 bottom-0 left-10 w-1 bg-red-600"></div>
        <div className="ml-16 rounded-lg bg-white p-3 shadow-sm">
          <div className="flex justify-between">
            <h4 className="font-['Baloo_2',sans-serif] font-bold">{title}</h4>
            <IconButton size="small">
              <MoreHoriz fontSize="small" />
            </IconButton>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
