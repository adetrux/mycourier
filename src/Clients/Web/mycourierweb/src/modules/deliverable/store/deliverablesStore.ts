import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deliverable } from "../models/deliverable";

interface DeliverablesState {
  deliverables: Deliverable[];
}

const mockDeliverables: Deliverable[] = [
  {
    id: "1",
    name: "package1",
    start: 2,
    end: 10,
    accepted: false,
    delivering: false,
    delivered: false
  },
  {
    id: "2",
    name: "package2",
    start: 3,
    end: 23,
    accepted: true,
    delivering: false,
    delivered: false
  },
  {
    id: "3",
    name: "package3",
    start: -2,
    end: -12,
    accepted: true,
    delivering: true,
    delivered: false
  }
];

const initialDeliverablesState: DeliverablesState = {
  deliverables: mockDeliverables
};

export const deliverables = createSlice({
  name: "deliverables",
  initialState: initialDeliverablesState,
  reducers: {
    addDeliverable(
      state: DeliverablesState,
      action: PayloadAction<Deliverable>
    ) {
      state.deliverables.push(action.payload);
    }
  }
});

export const { addDeliverable } = deliverables.actions;
export const deliverablesReducer = deliverables.reducer;
