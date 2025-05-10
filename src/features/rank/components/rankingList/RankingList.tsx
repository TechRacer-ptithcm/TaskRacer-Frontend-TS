import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserInfo from "./UserInfo";
import RankInfo from "./RankInfo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLeaderboardData } from "@/redux/rank/actions/rank.actions";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { UnknownAction } from "redux";
import { getLastInitial } from "@/utils/user-validate";

export default function RankingList() {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
  const leaderboard = useSelector((state: RootState) => state.rank.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboardData());
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <div className="w-[700px] space-y-3">
        {leaderboard.map((user, index) => (
          <div
            key={user.user.id}
            className="flex items-center justify-between rounded-[15px] bg-pink-50 p-4"
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
      </div>
    </div>
  );
}