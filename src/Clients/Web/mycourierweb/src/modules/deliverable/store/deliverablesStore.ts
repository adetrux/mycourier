import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deliverable } from "../models/deliverable";
import { DeliverableLocation } from "../models/deliverableLocation";

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
    addDeliverableLocation(
      state: DeliverablesState,
      action: PayloadAction<DeliverableLocation>
    ) {
      const { courierUserName, latitude, longitude } = action.payload;
      const index = state.deliverableLocations.findIndex(
        (dl) => dl.courierUserName === courierUserName
      );

      if (index === -1) {
        state.deliverableLocations.push({
          courierUserName,
          latitude,
          longitude,
        });
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
  addDeliverableLocation,
} = deliverables.actions;
export const deliverablesReducer = deliverables.reducer;
