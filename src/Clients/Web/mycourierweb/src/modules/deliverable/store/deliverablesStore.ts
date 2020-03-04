import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deliverable } from "../models/deliverable";

interface DeliverablesState {
  deliverables: Deliverable[];
  selectedDeliverable: Deliverable;
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
  },
  {
    id: "4",
    name: "package4",
    start: -12,
    end: -6,
    accepted: true,
    delivering: true,
    delivered: true
  }
];

const initialDeliverablesState: DeliverablesState = {
  deliverables: mockDeliverables,
  selectedDeliverable: ({} as unknown) as Deliverable
};

export const deliverables = createSlice({
  name: "deliverables",
  initialState: initialDeliverablesState,
  reducers: {
    addDeliverable(
      state: DeliverablesState,
      action: PayloadAction<Deliverable>
    ) {
      state.deliverables.unshift(action.payload);
      // TODO: call service
    },
    setSelectedDeliverable(
      state: DeliverablesState,
      action: PayloadAction<Deliverable>
    ) {
      state.selectedDeliverable = action.payload;
    }
  }
});

export const { addDeliverable, setSelectedDeliverable } = deliverables.actions;
export const deliverablesReducer = deliverables.reducer;
