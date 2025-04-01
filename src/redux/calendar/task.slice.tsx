import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export type Task = {
  id: string;
  title: string;
  content: string;
  description: string;
  start: string;
  end: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
};

type TaskState = {
  tasks: Task[];
  loading: boolean;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}content/tasks`);
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Fetch tasks error:", err.response?.data || err.message);
    return rejectWithValue(err.response?.data || err.message);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.tasks = action.payload.map((task) => ({
          id: task.id,
          title: task.content,
          content: task.content,
          description: task.description,
          start: task.startAt,
          end: task.dueAt,
          priority: task.priority,
          status: task.status,
        }));
        state.loading = false;
      })      
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setTasks, addTask } = taskSlice.actions;
export default taskSlice.reducer;
