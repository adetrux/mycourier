import { combineReducers } from "@reduxjs/toolkit";
import { deliverablesReducer } from "../../modules/deliverable/store/deliverablesStore";
import { userReducer } from "../../modules/user/userStore";

export const rootReducer = combineReducers({
  deliverablesReducer,
  userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
