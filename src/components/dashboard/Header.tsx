import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function DashboardHeader() {
  const { name } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex items-center justify-between">
      <div className="mt-5">
        <h1 className="font-['Baloo_2',sans-serif] text-3xl font-bold text-[#4B4E6D]">
          Hi, {name}
        </h1>
        <p className="font-['Baloo_2',sans-serif] text-xl text-[#4B4E6D]">
          Hãy hoàn thành nhiệm vụ của bạn hôm nay nhé!
        </p>
      </div>
    </div>
  );
}
