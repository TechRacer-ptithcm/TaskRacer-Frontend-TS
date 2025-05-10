import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { topUsers } from "@/redux/rank/rankData";
import { Star } from "lucide-react";

export default function RankingCard() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-white px-6 py-3">
      <div className="mb-4 flex justify-center">
        <h3 className="flex items-center gap-2 font-['Baloo_2',sans-serif] text-2xl font-bold">
          Ranking
          <span className="text-3xl">🏆</span>
        </h3>
      </div>

      {topUsers.slice(0, 3).map((user) => (
        <div
          key={user.id}
          className="mb-5 flex items-center justify-between rounded-[15px] bg-pink-50 p-2 font-['Baloo_2',sans-serif]"
        >
          <div className="flex items-center gap-4">
            <div className="ml-2 text-2xl font-bold text-[#CE4444]">
              #{user.position}
            </div>
            <Avatar
              sx={{
                bgcolor: "#f582ae",
                width: 50,
                height: 50,
                border: "2px solid white",
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <div>
              <div className="text-md font-semibold">{user.name}</div>
              <div className="flex items-center">
                <span className="text-md mt-1 text-[#3786EB]">
                  {user.score} điểm
                </span>
              </div>
            </div>
          </div>

          <div className="text-md flex w-[175px] flex-col items-center rounded-full px-3 py-1 font-semibold text-gray-700">
            <span className="mr-1">{user.rankTitle}</span>
            <img
              src={user.rankImage}
              alt={`${user.rankTitle} Rank`}
              className="h-15 w-15 rounded-[50px]"
            />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < user.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
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
