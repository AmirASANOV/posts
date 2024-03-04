import { configureStore } from "@reduxjs/toolkit";
import goodsReducer from "./goods";

export const store = configureStore({
  reducer: {
    pages: goodsReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;
