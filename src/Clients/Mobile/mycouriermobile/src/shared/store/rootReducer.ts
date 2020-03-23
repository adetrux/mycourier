import { combineReducers } from "@reduxjs/toolkit";
import { deliverablesReducer } from "../../modules/deliverable/store/deliverablesStore";
import { trackingReducer } from "../../modules/tracking/store/trackingStore";

export const rootReducer = combineReducers({
  deliverablesReducer,
  trackingReducer
});

export type RootState = ReturnType<typeof rootReducer>;
