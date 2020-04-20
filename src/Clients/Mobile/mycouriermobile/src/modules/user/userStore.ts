import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isSignedIn: boolean;
}

const initialUserState: UserState = {
  isSignedIn: false,
};

export const user = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setIsSignedIn(state: UserState, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload;
    },
  },
});

export const { setIsSignedIn } = user.actions;
export const userReducer = user.reducer;
