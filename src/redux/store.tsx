import { configureStore } from "@reduxjs/toolkit";
import selectedDateReducer from './calendar/selectedDate.slide'
import viewModeReducer from './calendar/ViewMode'

const store = configureStore({
  reducer: {
    selectedDate: selectedDateReducer,
    viewMode: viewModeReducer
}});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
