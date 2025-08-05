import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark" | "sepia";
}

const initialState: ThemeState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState["theme"]>) => {
      console.log("Theme changed to:", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
