import { configureStore, createSlice } from "@reduxjs/toolkit";

type actionPayload = { name: string };

const userName = createSlice({
  name: "userName",
  initialState: { name: "" },
  reducers: {
    setUserName: (state, action) => {
      const payload: actionPayload = action.payload;
      state.name = payload.name;
    },
  },
});

export const { setUserName } = userName.actions;

export const store = configureStore({
  reducer: {
    userName: userName.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
