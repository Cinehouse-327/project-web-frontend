import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  isAuthenticated: false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.isAuthenticated = true; 
      
     
      setTimeout(() => {
        state.userId = null;
        state.isAuthenticated = false;
      }, 3600000); 
    },
    logout: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
