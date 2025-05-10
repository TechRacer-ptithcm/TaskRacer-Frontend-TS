import { Avatar } from "@mui/material";

interface UserInfoProps {
  name: string;
  score: number;
  avatarChar: string;
  rank: number;
}

export default function UserInfo({ name, score, avatarChar, rank }: UserInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="ml-2 text-3xl font-bold text-[#CE4444]">#{rank}</div>
      <Avatar
        sx={{
          bgcolor: "#f582ae",
          width: 65,
          height: 65,
          border: "2px solid white",
        }}
      >
        {avatarChar}
      </Avatar>
      <div>
        <div className="text-xl font-semibold">{name}</div>
        <div className="flex items-center">
          <span className="mt-1 text-xl text-[#3786EB]">{score} điểm</span>
        </div>
      </div>
    </div>
  );
}