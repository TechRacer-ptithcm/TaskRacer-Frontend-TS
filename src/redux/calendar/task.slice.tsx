import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { RootState } from "@/redux/store";
const API_URL = import.meta.env.VITE_API_URL;

export type Task = {
  id: string;
  title: string;
  content: string;
  description: string;
  start: string;
  end: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
};

interface TaskResponse {
  id: string;
  content: string;
  description: string;
  startAt: string;
  dueAt: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
}

type TaskState = {
  tasks: Task[];
  loading: boolean;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

export const deleteTaskByIdThunk = createAsyncThunk(
  "task/deleteTaskById",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}content/task`, {
        params: { taskId },
      });
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete task");
    }
  },
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}content/tasks`);
      return res.data.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error("Fetch tasks error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (
    {
      title,
      priority,
      description,
      startAt,
      dueAt,
      status,
    }: {
      title: string;
      priority: "LOW" | "MEDIUM" | "HIGH";
      description: string;
      startAt: string;
      dueAt: string;
      status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`${API_URL}content/task`, {
        type: "USER",
        content: title,
        priority,
        description,
        startAt,
        dueAt,
        status,
        task_type: "USER"
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error("Create task error:", error);
      return rejectWithValue(error.response?.data || "Đã có lỗi xảy ra");
    }
  },
);

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
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskById: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
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
      })
      .addCase(
        createTask.fulfilled,
        (state, action: PayloadAction<{ data: TaskResponse }>) => {
          const task = action.payload.data;
          const newTask: Task = {
            id: task.id,
            title: task.content,
            content: task.content,
            description: task.description,
            start: task.startAt,
            end: task.dueAt,
            priority: task.priority,
            status: task.status,
          };
          state.tasks.push(newTask);
        },
      )
      .addCase(deleteTaskByIdThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const selectTaskById = (state: RootState, id: string) =>
  state.task.tasks.find((task) => task.id === id) || null;

export const { setTasks, addTask, deleteTask, updateTaskById } =
  taskSlice.actions;
export default taskSlice.reducer;
