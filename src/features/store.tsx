import { configureStore } from "@reduxjs/toolkit";
import { teamSlice } from "./teamSlice"; // Import the teamSlice to get its middleware

const store = configureStore({
  reducer: {
    [teamSlice.reducerPath]: teamSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(teamSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
