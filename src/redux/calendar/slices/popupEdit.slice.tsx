import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../types/taskTypes";
import axios from "@/lib/axios";
const API_URL = import.meta.env.VITE_API_URL;

interface PopupEditState {
  isEditOpen: boolean;
  task: Task | null;
}

const initialState: PopupEditState = {
  isEditOpen: false,
  task: null,
};

export const updateTaskThunk = createAsyncThunk(
  "popupEdit/updateTask",
  async (
    {
      taskId,
      title,
      priority,
      description,
      startAt,
      dueAt,
      status,
    }: {
      taskId: string;
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
      const response = await axios.put(`${API_URL}content/task`, {
        type: "USER",
        content: title,
        priority,
        description,
        startAt,
        dueAt,
        status,
      }, {
        params: { taskId }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đã có lỗi xảy ra khi cập nhật task");
    }
  },
);

const popupEditSlice = createSlice({
  name: "popupEdit",
  initialState,
  reducers: {
    openEdit: (state, action: PayloadAction<Task>) => {
      state.isEditOpen = true;
      state.task = action.payload;
    },
    closeEdit: (state) => {
      Object.assign(state, initialState);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const updatedTask = action.payload.data;
        state.task = {
          id: updatedTask.id,
          title: updatedTask.content,
          content: updatedTask.content,
          description: updatedTask.description,
          start: updatedTask.startAt,
          end: updatedTask.dueAt,
          priority: updatedTask.priority,
          status: updatedTask.status,
          taskType: "TASK",
        };
      });
  },
});

export const {
  openEdit,
  closeEdit,
  updateTask
} = popupEditSlice.actions;
export default popupEditSlice.reducer;