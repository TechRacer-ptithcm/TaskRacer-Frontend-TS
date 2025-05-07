import axios from "axios";
import { PomodoroState } from "../types/pomodoro.types";
const API_URL = import.meta.env.VITE_API_URL;

export const getStartTime = async () => {
  try {
    const response = await axios.get(`${API_URL}pomodoro`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Đã có lỗi xảy ra khi lấy thời gian bắt đầu";
  }
};

export const startPomodoro = async (state: PomodoroState) => {
  try {
    const minutes = state.settings.pomodoro;
    const endTime = Math.floor(Date.now() / 1000) + minutes * 60;

    const response = await axios.post(`${API_URL}pomodoro/start`, 
      { endTime },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Đã có lỗi xảy ra khi bắt đầu pomodoro";
  }
};

export const stopPomodoro = async () => {
  try {
    const response = await axios.post(`${API_URL}pomodoro/stop`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Đã có lỗi xảy ra khi dừng pomodoro";
  }
};