import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialLatitude = 0;
const initialLongitude = 0;

interface TrackingState {
  actualLatitude: number;
  actualLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
}

const initialTrackingState: TrackingState = {
  actualLatitude: initialLatitude,
  actualLongitude: initialLongitude,
  destinationLatitude: 0,
  destinationLongitude: 0
};

export const tracking = createSlice({
  name: "tracking",
  initialState: initialTrackingState,
  reducers: {
    setActualLatitude(state: TrackingState, action: PayloadAction<number>) {
      state.actualLatitude = action.payload;
    },
    setActualLongitude(state: TrackingState, action: PayloadAction<number>) {
      state.actualLongitude = action.payload;
    },
    setDestinationLatitude(
      state: TrackingState,
      action: PayloadAction<number>
    ) {
      state.destinationLatitude = action.payload;
    },
    setDestinationLongitude(
      state: TrackingState,
      action: PayloadAction<number>
    ) {
      state.destinationLongitude = action.payload;
    }
  }
});

export const {
  setActualLatitude,
  setActualLongitude,
  setDestinationLatitude,
  setDestinationLongitude
} = tracking.actions;
export const trackingReducer = tracking.reducer;
