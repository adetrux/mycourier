import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deliverable } from "../models/deliverable";

interface DeliverablesState {
  deliverables: Deliverable[];
  deliveringToCustomerIds: string[];
  selectedDeliverable: Deliverable;
}

const initialDeliverablesState: DeliverablesState = {
  deliverables: [],
  deliveringToCustomerIds: [],
  selectedDeliverable: ({} as unknown) as Deliverable,
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
    setDeliveringToCustomerIds(
      state: DeliverablesState,
      action: PayloadAction<string[]>
    ) {
      state.deliveringToCustomerIds = action.payload;
    },
    addDeliveringToCustomerId(
      state: DeliverablesState,
      action: PayloadAction<string>
    ) {
      if (!state.deliveringToCustomerIds.includes(action.payload)) {
        state.deliveringToCustomerIds = [
          ...state.deliveringToCustomerIds,
          action.payload,
        ];
      }
    },
    setSelectedDeliverable(
      state: DeliverablesState,
      action: PayloadAction<Deliverable>
    ) {
      state.selectedDeliverable = action.payload;
    },
    updateDeliverable(
      state: DeliverablesState,
      action: PayloadAction<Deliverable>
    ) {
      const index = state.deliverables.findIndex(
        (d) => d.id === action.payload.id
      );
      state.deliverables[index] = action.payload;
    },
  },
});

export const {
  setDeliverables,
  setDeliveringToCustomerIds,
  addDeliveringToCustomerId,
  setSelectedDeliverable,
  updateDeliverable,
} = deliverables.actions;
export const deliverablesReducer = deliverables.reducer;
