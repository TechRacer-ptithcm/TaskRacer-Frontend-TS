import { configureStore } from "@reduxjs/toolkit";
import selectedDateReducer from "./calendar/selectedDate.slide";
import viewModeReducer from "./calendar/ViewMode";
import authReducer from "./auth/authSlice";
import taskReducer from "./calendar/task.slice";
import userReducer from "./user/user.slice";
import { useDispatch } from "react-redux";
import popupCalenReducer from "./calendar/popupCalen.slice";
import premiumReducer from "./premium/premium.slice";
import pageReducer from "./page/pageSlice";

const store = configureStore({
  reducer: {
    selectedDate: selectedDateReducer,
    viewMode: viewModeReducer,
    auth: authReducer,
    task: taskReducer,
    user: userReducer,
    popupCalen: popupCalenReducer,
    premium: premiumReducer,
    page: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
