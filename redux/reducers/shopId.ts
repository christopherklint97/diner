import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopIdState } from "../../types/reducers";

const initialState = { value: [] } as ShopIdState;

const shopIdSlice = createSlice({
  name: "shopId",
  initialState,
  reducers: {
    updateShopId(state, action: PayloadAction<string[]>) {
      state.value = action.payload;
    },
  },
});

export const { updateShopId } = shopIdSlice.actions;
export default shopIdSlice.reducer;
