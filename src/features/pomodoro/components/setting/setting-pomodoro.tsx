import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@mui/material";
import { Input } from "@/components/ui/input";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/store";
import { pomodoroActions } from "@/redux/pomodoro/reducers/pomodoro.reducer";

export function SettingsDialog() {
  const dispatch = useAppDispatch();
  const settings = useSelector((state: RootState) => state.pomodoro.settings);
  const isSettingsOpen = useSelector((state: RootState) => state.pomodoro.isSettingsOpen);

  const handleClose = () => {
    dispatch(pomodoroActions.toggleSettingsOpen());
  };

  return (
    <Dialog
      open={isSettingsOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "1.5rem",
        },
      }}
    >
      <DialogContent className="max-w-md p-0">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-['Baloo_2',sans-serif] text-xl text-[#4B4E6D]">
              SETTING
            </h2>
            <button
              onClick={handleClose}
              className="rounded-full p-1 hover:bg-gray-100 cursor-pointer"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-[#4B4E6D]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#4B4E6D]">TIMER</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-500">Time (minutes)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Pomodoro</label>
                    <Input
                      type="number"
                      value={settings.pomodoro}
                      onChange={(e) => dispatch(pomodoroActions.changePomodoro(e.target.value))}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Short Break</label>
                    <Input
                      type="number"
                      value={settings.shortBreak}
                      onChange={(e) => dispatch(pomodoroActions.changeShortBreak(e.target.value))}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Long Break</label>
                    <Input
                      type="number"
                      value={settings.longBreak}
                      onChange={(e) => dispatch(pomodoroActions.changeLongBreak(e.target.value))}
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[#4B4E6D]">Auto Start Breaks</label>
                  <div
                    className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors"
                    onClick={() => dispatch(pomodoroActions.toggleAutoStartBreaks())}
                  >
                    <div
                      className={`${
                        settings.autoStartBreaks
                          ? "bg-[#4B4E6D]"
                          : "bg-gray-300"
                      } h-6 w-11 rounded-full transition-colors`}
                    />
                    <div
                      className={`${
                        settings.autoStartBreaks
                          ? "translate-x-6"
                          : "translate-x-1"
                      } absolute h-4 w-4 rounded-full bg-white transition-transform`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-[#4B4E6D]">Auto Start Pomodoros</label>
                  <div
                    className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors"
                    onClick={() => dispatch(pomodoroActions.toggleAutoStartPomodoros())}
                  >
                    <div
                      className={`${
                        settings.autoStartPomodoros
                          ? "bg-[#4B4E6D]"
                          : "bg-gray-300"
                      } h-6 w-11 rounded-full transition-colors`}
                    />
                    <div
                      className={`${
                        settings.autoStartPomodoros
                          ? "translate-x-6"
                          : "translate-x-1"
                      } absolute h-4 w-4 rounded-full bg-white transition-transform`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-[#4B4E6D]">Long Break interval</label>
                  <Input
                    type="number"
                    value={settings.longBreakInterval}
                    onChange={(e) => dispatch(pomodoroActions.changeLongBreakInterval(e.target.value))}
                    className="w-20 bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
