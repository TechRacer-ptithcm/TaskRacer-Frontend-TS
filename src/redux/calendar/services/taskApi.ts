import axios from "@/lib/axios";
import { AxiosError } from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = async () => {
  try {
    const res = await axios.get(`${API_URL}content/tasks`);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Fetch tasks error:", err.response?.data || err.message);
    throw err.response?.data || err.message;
  }
};

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: {
    title: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    description: string;
    startAt: string;
    dueAt: string;
    status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
  }) => {
    try {
      const response = await axios.post(`${API_URL}content/task`, {
        type: "USER",
        content: taskData.title,
        priority: taskData.priority,
        description: taskData.description,
        startAt: taskData.startAt,
        dueAt: taskData.dueAt,
        status: taskData.status,
        taskType: "TASK",
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Đã có lỗi xảy ra";
    }
  }
);

export const deleteTaskById = async (taskId: string) => {
  try {
    await axios.delete(`${API_URL}content/task`, {
      params: { taskId },
    });
    return taskId;
  } catch (error: any) {
    throw error.response?.data || "Failed to delete task";
  }
};