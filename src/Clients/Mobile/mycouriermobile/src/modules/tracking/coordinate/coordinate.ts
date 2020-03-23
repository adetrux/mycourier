import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/store/rootReducer";
import { setActualLatitude, setActualLongitude } from "../store/trackingStore";

export function simulateMoving(
  destinationLatitude: number,
  destinationLongitude: number
) {
  const actualLatitude = useSelector(
    (state: RootState) => state.trackingReducer.actualLatitude
  );
  const actualLongitude = useSelector(
    (state: RootState) => state.trackingReducer.actualLongitude
  );

  if (
    actualLatitude !== destinationLatitude ||
    actualLongitude !== destinationLongitude
  ) {
    moveTowardsDestination(
      actualLatitude,
      actualLongitude,
      destinationLatitude,
      destinationLongitude
    );
  }
}

function moveTowardsDestination(
  actualLatitude: number,
  actualLongitude: number,
  destinationLatitude: number,
  destinationLongitude: number
) {
  const dispatch = useDispatch();

  // latitude
  if (Math.abs(actualLatitude - destinationLatitude) < 1) {
    dispatch(setActualLatitude(destinationLatitude)); // finsihed
  } else {
    if (actualLatitude - destinationLatitude > 1) {
      dispatch(setActualLatitude(actualLatitude - 1));
    } else {
      dispatch(setActualLatitude(actualLatitude + 1));
    }
  }

  // longitude
  if (Math.abs(actualLongitude - destinationLongitude) < 1) {
    dispatch(setActualLongitude(destinationLongitude)); // finsihed
  } else {
    if (actualLongitude - destinationLongitude > 1) {
      dispatch(setActualLongitude(actualLongitude - 1));
    } else {
      dispatch(setActualLongitude(actualLongitude + 1));
    }
  }
}
