import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import RankInfo from "@/features/rank/components/rankingList/RankInfo";
import UserInfo from "@/features/rank/components/rankingList/UserInfo";
import { getLastInitial } from "@/utils/user-validate";

export default function RankingCard() {
  const navigate = useNavigate();
  const leaderboard = useSelector((state: RootState) => state.rank.leaderboard);

  return (
    <div className="rounded-3xl bg-white px-6 py-3">
      <div className="mb-4 flex justify-center">
        <h3 className="flex items-center gap-2 font-['Baloo_2',sans-serif] text-2xl font-bold">
          Ranking
          <span className="text-3xl">🏆</span>
        </h3>
      </div>

      {leaderboard.slice(0, 3).map((user, index) => (
        <div
          key={user.user.id}
          className="mb-5 flex items-center justify-between rounded-[15px] bg-pink-50 p-2"
        >
          <UserInfo
            name={user.user.name}
            score={user.score}
            avatarChar={getLastInitial(user.user.name)}
            rank={index + 1}
          />
          <RankInfo
            rankTitle={user.rankData.rank}
            stars={user.rankData.star}
            tier={user.rankData.tier}
          />
        </div>
      ))}

      <div className="mt-4 flex justify-center">
        <button
          className="rounded-full bg-white px-6 py-2 font-['Baloo_2',sans-serif] font-medium text-gray-600 shadow-sm"
          onClick={() => navigate("/home/ranking")}
        >
          See all
        </button>
      </div>
    </div>
  );
}
