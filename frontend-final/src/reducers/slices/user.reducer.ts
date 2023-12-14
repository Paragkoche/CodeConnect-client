import { createSlice } from "@reduxjs/toolkit";
interface userType {
  id: string;
  name: string;
  username: string;
  phone_number: string;
  email: string;
  role: string;
  score: number;
}
const initialState: {
  value: userType;
} = {
  value: {
    id: "",
    name: "",
    username: "",
    phone_number: "",
    email: "",
    role: "",
    score: 0,
  },
};
export const UserReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState.value;
    },
  },
});
export const { logout, login } = UserReducer.actions;
export default UserReducer.reducer;
