import { getLastInitial } from "@/utils/user-validate";
import { Avatar } from "@mui/material";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import medalIcon from "@/assets/icons/features/medal-sherif-badge-svgrepo-com.svg";
import Fire from "@/assets/icons/features/Fire.json";
import Lottie from "lottie-react";
import RankingList from "@/features/rank/components/rankingList/RankingList";
import RankInfo from "@/features/rank/components/rankingList/RankInfo";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentTopRankingData } from '@/redux/rank/actions/rank.actions';

export default function Rank() {
  const dispatch = useDispatch();
  const { name, streak } = useSelector((state: RootState) => state.user);
  const currentRank = useSelector((state: RootState) => state.rank.currentRank);

  useEffect(() => {
    dispatch(fetchCurrentTopRankingData() as any);
  }, [dispatch]);

  // if (!currentRank) {
  //   return <div>Loading...</div>;
  // }
  
  return (
    <main className="flex h-full font-['Baloo_2',sans-serif]">
      <div className="mr-3 mb-10 flex flex-1">
        <div className="relative w-full rounded-[50px] bg-white p-6 opacity-80 shadow-[20px_20px_40px_0px_rgba(0,_0,_0,_0.1)]">
          <div className="flex h-full flex-col gap-4 overflow-y-auto">
            {/* Current User Card */}
            <div className="flex justify-center">
              <div className="grid h-[170px] w-[700px] place-items-center rounded-[15px] bg-[#F3737E]/60 p-4">
                <div className="flex w-full items-center justify-between px-6">
                  <div className="flex items-center gap-3">
                    <div className="-ml-5 text-3xl font-bold text-[#CE4444]">
                      #
                    </div>
                    <Avatar
                      sx={{
                        bgcolor: "#f582ae ",
                        width: 80,
                        height: 80,
                        border: "2px solid white",
                      }}
                    >
                      {getLastInitial(name)}
                    </Avatar>
                    <div className="text-2xl font-semibold">{name}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {/* <div className="flex items-center gap-1">
                      <RankInfo
                        rankTitle={currentRank.rankData.rank}
                        stars={currentRank.rankData.star}
                        tier={currentRank.rankData.tier}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex justify-center">
              <div className="grid w-[700px] grid-cols-2 gap-4">
                <div className="flex h-[150px] w-[320px] flex-col justify-between rounded-[15px] bg-[#3786EB]/60 p-4">
                  {/* <div className="mt-4 ml-2 text-3xl font-bold text-[#3786EB]">
                    {currentRank.score}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="ml-2 text-2xl font-bold text-[#3786EB]">
                      Điểm KN
                    </div>
                    <img
                      src={medalIcon || "/placeholder.svg"}
                      alt="medal"
                      className="h-15 w-15"
                    />
                  </div> */}
                </div>

                <div className="flex flex-col justify-between rounded-[15px] bg-[#F9AA4B]/60 p-4">
                  <div className="mt-4 ml-2 text-3xl font-bold text-[#FC9502]">
                    {streak} ngày
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="ml-2 text-2xl font-bold text-[#FC9502]">
                      Streak
                    </div>
                    <div className="mb-6 flex justify-center">
                      <div className="h-10 w-10">
                        <Lottie animationData={Fire} loop autoplay />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ranking List */}
            <RankingList />
          </div>
        </div>
      </div>
    </main>
  );
}
