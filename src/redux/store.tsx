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
import remainingEventsDialogReducer from './calendar/remainingEventsDialog.slice';

// Other feature imports
import authReducer from "./auth/authSlice";
import userReducer from "./user/reducers/user.slice";
import premiumReducer from "./premium/premium.slice";
import pageReducer from "./page/pageSlice";
import pomodoroReducer from "../redux/pomodoro/reducers/pomodoro.reducer";
import notificationsReducer from "./notifications/notifications.slice";
import postFeedReducer from "./postFeed/postFeed.slice";
import todoReducer from "./todo/slices/todoSlice";
import teamReducer from "./team/sclice/teamSlice";
import rankReducer from "./rank/rank.slice";

import createSagaMiddleware from 'redux-saga';
import { pomodoroSaga } from '../redux/pomodoro/sagas/pomodoro.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    selectedDate: selectedDateReducer,
    viewMode: viewModeReducer,
    auth: authReducer,
    task: taskReducer,
    user: userReducer,
    popupCalen: popupCalenReducer,
    premium: premiumReducer,
    page: pageReducer,
    pomodoro: pomodoroReducer,
    popupSummary: popupSummaryReducer,
    popupEdit: popupEditReducer,
    notifications: notificationsReducer,
    postFeed: postFeedReducer,
    todo: todoReducer,
    team: teamReducer,
    rank: rankReducer,
    remainingEventsDialog: remainingEventsDialogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(pomodoroSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
