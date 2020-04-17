import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deliverable } from "../models/deliverable";
import { DeliverableLocation } from "../models/deliverableLocation";
import { deliverablesService } from "../service/deliverablesService";

interface DeliverablesState {
  deliverables: Deliverable[];
  selectedDeliverable: Deliverable;
  deliverableLocations: DeliverableLocation[];
}

const initialDeliverablesState: DeliverablesState = {
  deliverables: [],
  selectedDeliverable: ({} as unknown) as Deliverable,
  deliverableLocations: [],
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
      state.selectedDeliverable = state.deliverables[0];
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
    setDeliverableLocation(
      state: DeliverablesState,
      action: PayloadAction<DeliverableLocation>
    ) {
      const { deliverableId, latitude, longitude } = action.payload;
      const index = state.deliverableLocations.findIndex(
        (dl) => dl.deliverableId === deliverableId
      );

      if (index === -1) {
        state.deliverableLocations.push({ deliverableId, latitude, longitude });
      } else {
        state.deliverableLocations[index].latitude = latitude;
        state.deliverableLocations[index].longitude = longitude;
      }
    },
  },
});

export const {
  setDeliverables,
  createDeliverable,
  setSelectedDeliverable,
  updateDeliverable,
  setDeliverableLocation,
} = deliverables.actions;
export const deliverablesReducer = deliverables.reducer;
