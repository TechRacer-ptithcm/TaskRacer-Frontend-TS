import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getLastInitial } from "@/utils/name";
import Lottie from "lottie-react";
import fire from "@/assets/Fire.json";

export default function UserProfileCard() {
  const { name, streak } = useSelector((state: RootState) => state.user);

  return (
    <div className="rounded-3xl bg-white p-6">
      <div className="flex items-center gap-4">
        <Avatar sx={{ ml: 2, bgcolor: "#f582ae", width: 50, height: 50 }}>
          {getLastInitial(name)}
        </Avatar>
        <div>
          <h3 className="font-['Baloo_2',sans-serif] text-xl font-bold">
            {name}
          </h3>
          <p className="font-['Baloo_2',sans-serif] text-gray-500">UI/Design</p>
        </div>
        <div className="mr-7 ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="h-8 w-8 -translate-y-3 transform">
              <Lottie animationData={fire} loop autoplay />
            </div>
            <span className="font-['Baloo_2',sans-serif] text-2xl font-bold text-amber-500">
              {streak}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
