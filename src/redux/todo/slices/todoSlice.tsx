import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoState } from "../types/todoTypes";

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => { // action.payload là todoId
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false; // Khi có lỗi, thường thì loading nên dừng lại
    }
  },
  // extraReducers có thể được thêm vào sau nếu bạn giới thiệu các async thunks
});

export const {
  setTodos,
  addTodo,
  removeTodo,
  updateTodo,
  setLoading,
  setError
} = todoSlice.actions;

export default todoSlice.reducer;