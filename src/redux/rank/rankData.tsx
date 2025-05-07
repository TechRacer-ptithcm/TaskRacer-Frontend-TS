import GRANDMASTER from "@/assets/images/ranks/GRANDMASTER-Photoroom.png";
import MASTER from "@/assets/images/ranks/MASTER-Photoroom.png";
import CONQUEROR from "@/assets/images/ranks/CONQUEROR-Photoroom.png";
import HEROIC from "@/assets/images/ranks/HEROIC-Photoroom.png";
import BROZEN from "@/assets/images/ranks/BROZEN-Photoroom.png";

export type RankUser = {
  id: number;
  position: number;
  name: string;
  score: number;
  stars: number;
  rankTitle?: string;
  rankImage?: string;
};

export const User: RankUser[] = [
  {
    id: 5,
    position: 5,
    name: "Bạn",
    score: 7,
    stars: 3,
    rankTitle: "BROZEN I",
    rankImage: BROZEN,
  },
];
export const topUsers: RankUser[] = [
  {
    id: 1,
    position: 1,
    name: "Chây 97",
    score: 678,
    stars: 5,
    rankTitle: "GrandMaster I",
    rankImage: GRANDMASTER,
  },
  {
    id: 2,
    position: 2,
    name: "Vi rút",
    score: 543,
    stars: 4,
    rankTitle: "Master I",
    rankImage: MASTER,
  },
  {
    id: 3,
    position: 3,
    name: "Lép Đích",
    score: 345,
    stars: 3,
    rankTitle: "CONQUEROR I",
    rankImage: CONQUEROR,
  },
  {
    id: 4,
    position: 4,
    name: "Đum Đúm",
    score: 123,
    stars: 2,
    rankTitle: "HEROIC I",
    rankImage: HEROIC,
  },
  {
    id: 5,
    position: 5,
    name: "Bạn",
    score: 7,
    stars: 3,
    rankTitle: "BROZEN I",
    rankImage: BROZEN,
  },
];
