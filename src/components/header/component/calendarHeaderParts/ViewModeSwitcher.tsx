import { Menu, MenuItem } from "@mui/material";

interface ViewModeSwitcherProps {
  viewMode: "day" | "week" | "month";
  anchorEl: null | HTMLElement;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  onSetViewMode: (mode: "day" | "week" | "month") => void;
}

const ViewModeSwitcher = ({
  viewMode,
  anchorEl,
  onMenuClick,
  onMenuClose,
  onSetViewMode,
}: ViewModeSwitcherProps) => {
  const handleSelectMode = (mode: "day" | "week" | "month") => {
    onSetViewMode(mode);
    onMenuClose();
  };

  return (
    <>
      <button
        onClick={onMenuClick}
        className="cursor-pointer rounded-full border border-[#888] bg-white px-3 py-1 font-['Baloo_2',sans-serif] text-xl font-semibold transition-all hover:shadow-md"
      >
        {viewMode === "day" ? "Ngày" : viewMode === "week" ? "Tuần" : "Tháng"}
      </button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMenuClose}>
        <MenuItem onClick={() => handleSelectMode("day")}>Ngày</MenuItem>
        <MenuItem onClick={() => handleSelectMode("week")}>Tuần</MenuItem>
        <MenuItem onClick={() => handleSelectMode("month")}>Tháng</MenuItem>
      </Menu>
    </>
  );
};

export default ViewModeSwitcher;