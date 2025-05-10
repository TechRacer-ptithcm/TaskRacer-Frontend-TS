import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Lottie from "lottie-react";
import Fire from "@/assets/icons/features/Fire.json";
import { useEffect, useState } from "react";
import {getCurrentRankingData, } from "@/redux/rank/services/rank.service.ts";
import {getRankImage, rankImageMap} from "@/redux/rank/rankData.tsx";
import {convertToRoman} from "@/utils/rank-utils.tsx";

export interface RankUser {
  user: {
    streak: number;
    username: string;
    name: string;
  };
  score: number;
  rankData: {
    rank: string;
    tier: number;
    star: number;
  };
}

export default function UserStatsCard() {
  const [currentUser, setCurrentUser] = useState<RankUser>();

  useEffect(() => {
    getCurrentRankingData().then((data) => setCurrentUser(data));
  }, []);
  console.log(currentUser)
  if (!currentUser) return null;

  return (
      <Card className="border-none bg-[#FFE8A2]">
        <CardContent className="flex py-4">
          <div className="flex w-1/2 flex-col justify-center gap-2">
            <div className="flex items-center justify-center">
              <div className="text-2xl font-semibold text-gray-700">
                {currentUser?.rankData?.rank} {convertToRoman(currentUser?.rankData?.tier)}
              </div>
            </div>
            <div className="flex justify-center">
              <img
                  src={getRankImage(currentUser?.rankData?.rank as keyof typeof rankImageMap)}
                  alt={`${currentUser?.rankData?.rank} Rank`}
                  className="h-20 w-20 rounded-[50px] object-contain"
              />

            </div>
            <div className="flex justify-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                  <Star
                      key={i}
                      className={i < currentUser?.rankData?.star ? "fill-yellow-500" : ""}
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
              {currentUser.user.streak} ngày
            </span>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
