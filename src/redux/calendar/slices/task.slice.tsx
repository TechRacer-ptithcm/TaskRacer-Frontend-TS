import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { fetchTasks, deleteTaskById } from "../services/taskApi";
import { Task, TaskResponse, TaskState } from "../types/taskTypes";
import axios from "@/lib/axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

export const deleteTaskByIdThunk = createAsyncThunk(
  "task/deleteTaskById",
  async (taskId: string, { rejectWithValue }) => {
    try {
      return await deleteTaskById(taskId);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTasks();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createTaskThunk = createAsyncThunk<
  TaskResponse,
  {
    title: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    description: string;
    startAt: string;
    dueAt: string;
    status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
  },
  { rejectValue: string }
>('tasks/createTask', async (taskData, { rejectWithValue }) => {
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
    return rejectWithValue(error.response?.data || "Đã có lỗi xảy ra");
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
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTasksThunk.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.tasks = action.payload.map((task) => ({
            id: task.id,
            title: task.content,
            content: task.content,
            description: task.description,
            start: task.startAt,
            end: task.dueAt,
            priority: task.priority,
            status: task.status,
            taskType: "TASK",
          }));
          state.loading = false;
        },
      )
      .addCase(fetchTasksThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        createTaskThunk.fulfilled,
        (state, action: PayloadAction<TaskResponse>) => {
          const task = action.payload;
          const newTask: Task = {
            id: task.id,
            title: task.content,
            content: task.content,
            description: task.description,
            start: task.startAt,
            end: task.dueAt,
            priority: task.priority,
            status: task.status,
            taskType: "TASK",
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
