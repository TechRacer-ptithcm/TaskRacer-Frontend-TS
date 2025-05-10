import { Star } from "lucide-react";
import { rankImages } from "@/features/rank/constants/rank.constants";
import { convertToRoman } from "@/utils/rank-utils";

interface RankInfoProps {
  rankTitle: string;
  stars: number;
  tier: number;
}

export default function RankInfo({ rankTitle, stars, tier }: RankInfoProps) {
  const rankImage = rankImages[rankTitle] || rankImages["BROZEN"];
  const romanTier = convertToRoman(tier);

  return (
    <div className="flex w-[175px] flex-col items-center rounded-full px-3 py-1 text-xl font-semibold text-gray-700">
      <span className="mr-1">{rankTitle} {romanTier}</span>
      <img
        src={rankImage}
        alt={`${rankTitle} Rank`}
        className="h-20 w-20 rounded-[50px]"
      />
      <div className="flex gap-1 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < stars ? "fill-yellow-500" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}