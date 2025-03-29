// features/tasks/taskSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
const API_URL = import.meta.env.VITE_API_URL;

export type Task = {
  id: string;
  title: string;
  start: string;
  end: string;
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
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.get(`${API_URL}content/tasks`);
    console.log("All tasks:", res.data.data);
    return res.data.data;
  } catch (error: any) {
    console.error("Fetch tasks error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default taskSlice.reducer;
