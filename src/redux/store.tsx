// Core Redux imports
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Calendar related imports
import selectedDateReducer from "./calendar/selectedDate.slide";
import viewModeReducer from "./calendar/ViewMode";
import taskReducer from "./calendar/task.slice";
import popupCalenReducer from "./calendar/popupCalen.slice";
import popupSummaryReducer from "./calendar/popupSummary.slice";
import popupEditReducer from "./calendar/popupEdit.slice";

// Other feature imports
import authReducer from "./auth/authSlice";
import userReducer from "./user/user.slice";
import premiumReducer from "./premium/premium.slice";
import pageReducer from "./page/pageSlice";
import pomodoroRucer from "@/redux/pomodoro/slices/pomodoro.slice";
import notificationsReducer from "./notifications/notifications.slice";
import postFeedReducer from "./postFeed/postFeed.slice";
import todoReducer from './todo/slices/todoSlice';
import teamReducer from "./team/sclice/teamSlice";

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
    pomodoro: pomodoroRucer,
    popupSummary: popupSummaryReducer,
    popupEdit: popupEditReducer,
    notifications: notificationsReducer,
    postFeed: postFeedReducer,
    todo: todoReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
