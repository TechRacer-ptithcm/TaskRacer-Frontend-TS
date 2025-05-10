import axios from "@/lib/axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getCurrentRankingData = async () => {
  try {
    const response = await axios.get(`${API_URL}social/ranking/current-data`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: unknown }).response === "object"
    ) {
      const res = error as { response?: { data?: { code?: string } } };
      throw new Error(res.response?.data?.code ?? "Lỗi khi lấy dữ liệu xếp hạng");
    }
    throw new Error("Lỗi không xác định");
  }
};

export const getCurrentTopRankingData = async () => {
  try {
    const response = await axios.get(`${API_URL}social/ranking/current-top`);
    return response.data.data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: unknown }).response === "object"
    ) {
      const res = error as { response?: { data?: { code?: string } } };
      throw new Error(res.response?.data?.code ?? "Lỗi khi lấy dữ liệu top xếp hạng");
    }
    throw new Error("Lỗi không xác định");
  }
};

export const getLeaderboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}social/leaderboard`);
    return response.data.data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: unknown }).response === "object"
    ) {
      const res = error as { response?: { data?: { code?: string } } };
      throw new Error(res.response?.data?.code ?? "Lỗi khi lấy dữ liệu bảng xếp hạng");
    }
    throw new Error("Lỗi không xác định");
  }
};