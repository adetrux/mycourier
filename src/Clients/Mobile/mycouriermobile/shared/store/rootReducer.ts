import { combineReducers } from "@reduxjs/toolkit";
import { deliverablesReducer } from "../../modules/deliverable/store/deliverablesStore";

export const rootReducer = combineReducers({
  deliverablesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
