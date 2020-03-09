import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deliverable } from "../models/deliverable";
import { deliverablesService } from "../service/deliverablesService";

interface DeliverablesState {
  deliverables: Deliverable[];
  selectedDeliverable: Deliverable;
}

const initialDeliverablesState: DeliverablesState = {
  deliverables: [],
  selectedDeliverable: ({} as unknown) as Deliverable
};

export const deliverables = createSlice({
  name: "deliverables",
  initialState: initialDeliverablesState,
  reducers: {
    setDeliverables(
      state: DeliverablesState,
      action: PayloadAction<Deliverable[]>
    ) {
      state.deliverables = action.payload.slice(0);
    },
    createDeliverable(
      state: DeliverablesState,
      action: PayloadAction<Deliverable>
    ) {
      state.deliverables.unshift(action.payload);
      deliverablesService.createDeliverable(action.payload);
    },
    setSelectedDeliverable(
      state: DeliverablesState,
      action: PayloadAction<Deliverable>
    ) {
      state.selectedDeliverable = action.payload;
    }
  }
});

export const {
  setDeliverables,
  createDeliverable,
  setSelectedDeliverable
} = deliverables.actions;
export const deliverablesReducer = deliverables.reducer;
