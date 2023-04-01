import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type User = {
  id: number;
  name: string;
};

export interface UserState {
  loggedIn: User | null;
}

const initialState: UserState = {
  loggedIn: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<User>) => {
      console.log("here");

      console.log(action);
      
      
      state.loggedIn = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
