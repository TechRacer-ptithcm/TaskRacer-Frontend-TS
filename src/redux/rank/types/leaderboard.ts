export interface User {
  id: string;
  name: string;
}

export interface RankData {
  rank: string;
  tier: number;
  star: number;
}

export interface Leaderboard {
  user: User;
  score: number;
  rankData: RankData;
}


export interface CurrentRank {
  user: {
    streak: number;
    username: string;
    name: string;
  };
  score: number;
  rankData: RankData;
}

