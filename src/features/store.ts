import { configureStore } from "@reduxjs/toolkit";
import { memberSlice } from "./memberSlice";
import authReducer from "./authSlice";
import teamSlice from "./teamSlice";

const store = configureStore({
  reducer: {
    [memberSlice.reducerPath]: memberSlice.reducer,
    team: teamSlice,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(memberSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
