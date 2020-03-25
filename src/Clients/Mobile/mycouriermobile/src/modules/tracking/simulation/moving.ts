export function simulateMoving(
  actualLatitude: number,
  actualLongitude: number,
  destinationLatitude: number,
  destinationLongitude: number,
  setLatitude: (newLatitude: number) => void,
  setLongitude: (newLongitude: number) => void
) {
  if (
    actualLatitude !== destinationLatitude ||
    actualLongitude !== destinationLongitude
  ) {
    moveTowardsDestination(
      actualLatitude,
      actualLongitude,
      destinationLatitude,
      destinationLongitude,
      setLatitude,
      setLongitude
    );
  }
}

function moveTowardsDestination(
  actualLatitude: number,
  actualLongitude: number,
  destinationLatitude: number,
  destinationLongitude: number,
  setLatitude: (newLatitude: number) => void,
  setLongitude: (newLongitude: number) => void
) {
  // latitude
  if (Math.abs(actualLatitude - destinationLatitude) < 1) {
    // dispatch(setActualLatitude(destinationLatitude)); // finsihed
    setLatitude(destinationLatitude);
  } else {
    if (actualLatitude - destinationLatitude > 1) {
      // dispatch(setActualLatitude(actualLatitude - 1));
      setLatitude(actualLatitude - 1);
    } else {
      setLatitude(actualLatitude + 1);
    }
  }

  // longitude
  if (Math.abs(actualLongitude - destinationLongitude) < 1) {
    // dispatch(setActualLongitude(destinationLongitude)); // finsihed
    setLongitude(destinationLongitude);
  } else {
    if (actualLongitude - destinationLongitude > 1) {
      // dispatch(setActualLongitude(actualLongitude - 1));
      setLongitude(actualLongitude - 1);
    } else {
      // dispatch(setActualLongitude(actualLongitude + 1));
      setLongitude(actualLongitude + 1);
    }
  }
}
