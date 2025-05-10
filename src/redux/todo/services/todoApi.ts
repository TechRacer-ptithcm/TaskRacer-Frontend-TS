import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo, CreateTodoPayload } from '../types/todoTypes'; 

const API_URL = import.meta.env.VITE_API_URL;

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData: CreateTodoPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}content/task`, {
        type: "USER",
        content: todoData.content,
        priority: todoData.priority,
        description: todoData.description,
        startAt: todoData.startAt,
        dueAt: todoData.dueAt,
        status: todoData.status,
        taskType: "TODO",
      });
      return response.data.data as Todo;
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Đã có lỗi xảy ra khi tạo todo");
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todoData: Todo, { rejectWithValue }) => { // todoData nên là một Todo object hoàn chỉnh bao gồm id
    try {
      const { id, ...updatePayload } = todoData;
      const response = await axios.put(`${API_URL}content/todo/${id}`, updatePayload); // Giả sử endpoint là /todo/:id cho PUT
      return response.data.data as Todo;
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Đã có lỗi xảy ra khi cập nhật todo");
    }
  }
);

export const deleteTodoById = createAsyncThunk(
  'todos/deleteTodoById',
  async (todoId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}content/todo`, { // Hoặc `${API_URL}content/todo/${todoId}` tùy theo API backend
        params: { todoId }, // Nếu API backend nhận id qua query params
      });
      return todoId; // Trả về id để slice có thể xử lý việc xóa khỏi state
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("Không thể xóa todo");
    }
  }
);