import { combineReducers } from "@reduxjs/toolkit";
import nameSlice from "./name";
import shopIdSlice from "./shopId";
import activeSlice from "./active";

const rootReducer = combineReducers({
  name: nameSlice,
  shopId: shopIdSlice,
  active: activeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
