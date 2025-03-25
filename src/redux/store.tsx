import { configureStore } from "@reduxjs/toolkit";
import selectedDateReducer from "./calendar/selectedDate.slide";
import viewModeReducer from "./calendar/ViewMode";
import authReducer from "./auth/authSlice";
import taskReducer from "./calendar/task.slice";
import userReducer from "./user/user.slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    selectedDate: selectedDateReducer,
    viewMode: viewModeReducer,
    auth: authReducer,
    task: taskReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
