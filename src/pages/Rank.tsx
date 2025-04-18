import { getLastInitial } from "@/utils/name";
import { Avatar } from "@mui/material";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Star } from "lucide-react";
import medalIcon from "@/assets/medal-sherif-badge-svgrepo-com.svg";
import Fire from "@/assets/Fire.json";
import Lottie from "lottie-react";
import BROZEN from "@/assets/ranks/BROZEN-Photoroom.png";
import GRANDMASTER from "@/assets/ranks/GRANDMASTER-Photoroom.png";
import MASTER from "@/assets/ranks/MASTER-Photoroom.png";
import CONQUEROR from "@/assets/ranks/CONQUEROR-Photoroom.png";
import HEROIC from "@/assets/ranks/HEROIC-Photoroom.png";

// Define types for ranking users
type RankUser = {
  id: number;
  position: number;
  name: string;
  score: number;
  rankTitle?: string;
  rankImage?: string;
};

export default function Rank() {
  const { name } = useSelector((state: RootState) => state.user);

  // Sample data for the ranking list
  const topUsers: RankUser[] = [
    {
      id: 1,
      position: 1,
      name: "Chây 97",
      score: 678,
      rankTitle: "GrandMaster I",
      rankImage: GRANDMASTER,
    },
    {
      id: 2,
      position: 2,
      name: "Vi rút",
      score: 543,
      rankTitle: "Master I",
      rankImage: MASTER,
    },
    {
      id: 3,
      position: 3,
      name: "Lép Đích",
      score: 345,
      rankTitle: "CONQUEROR I",
      rankImage: CONQUEROR,
    },
    {
      id: 4,
      position: 4,
      name: "Đum Đúm",
      score: 123,
      rankTitle: "HEROIC I",
      rankImage: HEROIC,
    },
  ];

  // Current user position (for demo purposes)
  const userPosition = 100;
  const userPoints = 10;
  const userStars = 3;
  const userScore = 7;

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
                      #{userPosition}
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
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col items-center rounded-full px-3 py-1 text-xl font-semibold text-gray-700">
                        <span className="mr-1">BROZEN I</span>
                        <img
                          src={BROZEN || "/placeholder.svg"}
                          alt="Brozen Rank"
                          className="h-25 w-25 rounded-[50px]"
                        />
                      </div>
                    </div>
                    <div className="-mt-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < userStars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex justify-center">
              <div className="grid w-[700px] grid-cols-2 gap-4">
                <div className="flex h-[150px] w-[320px] flex-col justify-between rounded-[15px] bg-[#3786EB]/60 p-4">
                  <div className="mt-4 ml-2 text-3xl font-bold text-[#3786EB]">
                    {userPoints}
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
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-[15px] bg-[#F9AA4B]/60 p-4">
                  <div className="mt-4 ml-2 text-3xl font-bold text-[#FC9502]">
                    {userScore} ngày
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
            <div className="flex justify-center">
              <div className="w-[700px] space-y-3">
                {topUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-[15px] bg-pink-50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank indicator */}

                      <div className="ml-2 text-3xl font-bold text-[#CE4444]">
                        #{user.position}
                      </div>

                      {/* User avatar */}
                      <Avatar
                        sx={{
                          bgcolor: "#f582ae",
                          width: 65,
                          height: 65,
                          border: "2px solid white",
                        }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>

                      {/* User info */}
                      <div>
                        <div className="text-xl font-semibold">{user.name}</div>
                        <div className="flex items-center">
                          <span className="mt-1 text-xl text-[#3786EB]">
                            {user.score} điểm
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rank icons on the right */}
                    <div className="flex w-[175px] flex-col items-center rounded-full px-3 py-1 text-xl font-semibold text-gray-700">
                      <span className="mr-1">{user.rankTitle}</span>
                      <img
                        src={user.rankImage}
                        alt={`${user.rankTitle} Rank`}
                        className="h-20 w-20 rounded-[50px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
