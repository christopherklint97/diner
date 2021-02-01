import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NameState } from "../../types/reducers";

const initialState = { value: "" } as NameState;

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { updateName } = nameSlice.actions;
export default nameSlice.reducer;
