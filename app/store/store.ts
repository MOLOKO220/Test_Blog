import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    themes: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
