import { configureStore } from "@reduxjs/toolkit";
import { teamSlice } from "./teamSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    [teamSlice.reducerPath]: teamSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(teamSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
