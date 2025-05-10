import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Lottie from "lottie-react";
import Fire from "@/assets/icons/features/Fire.json";
import { User } from "@/redux/rank/rankData";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function UserStatsCard() {
  const { streak } = useSelector((state: RootState) => state.user);
  const currentUser = User[0];

  return (
    <Card className="border-none bg-[#FFE8A2]">
      <CardContent className="flex py-4">
        <div className="flex w-1/2 flex-col justify-center gap-2">
          <div className="flex items-center justify-center">
            <div className="text-2xl font-semibold text-gray-700">
              {currentUser.rankTitle}
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={currentUser.rankImage}
              alt={`${currentUser.rankTitle} Rank`}
              className="h-20 w-20 rounded-[50px] object-contain"
            />
          </div>
          <div className="flex justify-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={i < currentUser.stars ? "fill-yellow-500" : ""}
                size={25}
              />
            ))}
          </div>
        </div>
        <div className="flex w-1/2 flex-col justify-center gap-2 text-[#FC9502]">
          <div className="flex items-center justify-center">
            <div className="text-2xl font-bold">Streak</div>
          </div>
          <div className="mb-6 flex justify-center">
            <div className="h-13 w-13">
              <Lottie animationData={Fire} loop autoplay />
            </div>
          </div>
          <div className="flex justify-center text-[#FC9502]">
            <span className="text-center text-2xl font-bold">
              {streak} ngày
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}