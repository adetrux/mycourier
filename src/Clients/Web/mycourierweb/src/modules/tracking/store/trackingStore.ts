import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrackingState {
  actualLatitude?: number;
  actualLongitude?: number;
}

const initialTrackingState: TrackingState = {
  actualLatitude: undefined,
  actualLongitude: undefined,
};

export const tracking = createSlice({
  name: "tracking",
  initialState: initialTrackingState,
  reducers: {
    setActualLatitude(
      state: TrackingState,
      action: PayloadAction<number | undefined>
    ) {
      state.actualLatitude = action.payload;
    },
    setActualLongitude(
      state: TrackingState,
      action: PayloadAction<number | undefined>
    ) {
      state.actualLongitude = action.payload;
    },
  },
});

export const { setActualLatitude, setActualLongitude } = tracking.actions;
export const trackingReducer = tracking.reducer;
