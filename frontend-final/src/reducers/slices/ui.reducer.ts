import { createSlice } from "@reduxjs/toolkit";

interface UIType {
  theme: "DarkSpacesTheme" | "PureLightTheme";
  navbar: boolean;
}

const initialState: {
  value: UIType;
} = {
  value: {
    theme: "PureLightTheme",
    navbar: false,
  },
};

export const UIReducer = createSlice({
  name: "UI-REDUCER",
  initialState,
  reducers: {
    chengMod: (state) => {
      state.value.theme =
        state.value.theme == "DarkSpacesTheme"
          ? "PureLightTheme"
          : "DarkSpacesTheme";
    },
    chengNav: (state) => {
      state.value.navbar = !state.value.navbar;
    },
  },
});
export const { chengMod, chengNav } = UIReducer.actions;
export default UIReducer.reducer;
