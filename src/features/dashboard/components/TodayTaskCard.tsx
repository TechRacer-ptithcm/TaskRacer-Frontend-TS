import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/store";
import { setPage } from "@/redux/page/pageSlice";
import { resetToCurrentDate } from "@/redux/calendar/selectedDate.slide";
import { setViewMode } from "@/redux/calendar/ViewMode";
import taskIcon from "@/assets/images/backgrounds/isometric-university-concept-background.png";

export default function TodayTaskCard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToTodayCalendar = () => {
    navigate("/home/calendar");
    dispatch(setPage("calendar"));
    dispatch(resetToCurrentDate());
    dispatch(setViewMode("day"));
  };

  return (
    <div className="flex justify-between rounded-3xl bg-white p-6">
      <div className="space-y-4">
        <h2 className="font-['Baloo_2',sans-serif] text-4xl font-bold text-red-500">
          Nhiệm vụ hôm nay
        </h2>
        <p className="font-['Baloo_2',sans-serif] text-lg text-red-500">
          Kiểm tra các nhiệm vụ và lịch trình trong ngày của bạn
        </p>

        <Button
          onClick={goToTodayCalendar}
          className="rounded-full bg-[#ff5470] px-6 py-6 font-['Baloo_2',sans-serif] font-medium text-white shadow-md hover:bg-[#e03a57]"
        >
          Lịch hôm nay
        </Button>
      </div>
      <div className="hidden md:block">
        <img src={taskIcon} alt="Task illustration" className="h-48" />
      </div>
    </div>
  );
}
