import axios from "@/lib/axios";
import { CreateTeamRequest } from '../teamTypes/CreateTeamRequest';

const API_URL = import.meta.env.VITE_API_URL;

export const createTeamService = async (teamData: CreateTeamRequest) => {
  try {
    const response = await axios.post(`${API_URL}social/team`, teamData);
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || "Đã có lỗi xảy ra khi tạo team";
  }
};

export const fetchTeamsService = async () => {
  try {
    const response = await axios.get(`${API_URL}social/teams`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Đã có lỗi xảy ra khi lấy danh sách team";
  }
};