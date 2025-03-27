import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiClock } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setStartTime, setEndTime } from "@/redux/calendar/popupCalen.slice";
import { RootState } from "@/redux/store";
import { close, setTime } from "@/redux/calendar/popupCalen.slice";
import TimePicker from "./time-picker";

export default function PopUpCalen() {
  const dispatch = useDispatch();
  const popoverRef = useRef<HTMLDivElement>(null);
  const { isOpen, selectedDate, isSetTime, startTime, endTime } = useSelector(
    (state: RootState) => state.popupCalen,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        !target.closest(".popover-content")
      ) {
        dispatch(close());
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => dispatch(close())}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-lg rounded-xl bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Thêm tiêu đề</h2>
          <Button variant="ghost" size="icon" onClick={() => dispatch(close())}>
            <IoCloseSharp className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <FiClock className="text-gray-600" />
            <div className="flex w-full items-center justify-between">
              <span className="text-sm text-black capitalize">
                {selectedDate
                  ? !isSetTime
                    ? `${selectedDate.format("dddd, D [tháng] M")} ⋅ ${startTime} – ${endTime}`
                    : selectedDate.format("dddd, D [tháng] M")
                  : "Chưa chọn ngày"}
              </span>
              <div className="flex items-center gap-x-2">
                {isSetTime ? (
                  <div className="flex items-center gap-x-2">
                    <TimePicker
                      value={startTime ?? ""}
                      onChange={(val) => dispatch(setStartTime(val))}
                    />
                    <span>-</span>
                    <TimePicker
                      value={endTime ?? ""}
                      onChange={(val) => dispatch(setEndTime(val))}
                    />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="h-7 px-3 text-xs"
                    onClick={() => dispatch(setTime(true))}
                  >
                    Thêm thời gian
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
