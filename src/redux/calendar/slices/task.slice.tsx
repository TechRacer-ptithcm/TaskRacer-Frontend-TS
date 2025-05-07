import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { fetchTasks, createTask, deleteTaskById } from "../services/taskApi";
import { Task, TaskResponse, TaskState } from "../types/taskTypes";

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
  }
);

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTasks();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTaskThunk = createAsyncThunk(
  "tasks/createTask",
  async (taskData: {
    title: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    description: string;
    startAt: string;
    dueAt: string;
    status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
  }, { rejectWithValue }) => {
    try {
      return await createTask(taskData);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
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
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
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
      .addCase(fetchTasksThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        createTaskThunk.fulfilled,
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
