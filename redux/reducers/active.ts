import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveSlice } from "../../types/reducers";

const initialState = { value: false } as ActiveSlice;

const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    isActive(state, action: PayloadAction<boolean>) {
      state.value = action.payload;
    },
  },
});

export const { isActive } = activeSlice.actions;
export default activeSlice.reducer;
