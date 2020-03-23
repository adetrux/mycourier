import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialLatitude = 0;
const initialLongitude = 0;

interface TrackingState {
  actualLatitude: number;
  actualLongitude: number;
}

const initialTrackingState: TrackingState = {
  actualLatitude: initialLatitude,
  actualLongitude: initialLongitude
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
    }
  }
});

export const { setActualLatitude, setActualLongitude } = tracking.actions;
export const trackingReducer = tracking.reducer;
