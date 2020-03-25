import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { colors } from "../../../assets/colors";
import { RootState } from "../../../shared/store/rootReducer";

const useStyles = makeStyles((theme: Theme) => ({
  map: {
    height: "100vh",
    width: "80%",
    paddingLeft: theme.spacing(2),
    backgroundColor: colors.blue
  }
}));

export function Map() {
  const classes = useStyles();
  const selectedDeliverable = useSelector(
    (state: RootState) => state.deliverablesReducer.selectedDeliverable
  );
  const actualLatitude = useSelector(
    (state: RootState) => state.trackingReducer.actualLatitude
  );
  const actualLongitude = useSelector(
    (state: RootState) => state.trackingReducer.actualLongitude
  );

  return (
    <div className={classes.map}>
      <h1>Tracking package: {selectedDeliverable.name}</h1>
      <h4>Package ID: {selectedDeliverable.id}</h4>
      <h4>Starting location: {selectedDeliverable.startLocationLatitude}</h4>
      <h5>
        lat: {selectedDeliverable.startLocationLatitude}, long:{" "}
        {selectedDeliverable.startLocationLongitude}
      </h5>
      <h4>
        Destination location: {selectedDeliverable.destinationLocationLatitude}
      </h4>
      <h5>
        lat: {selectedDeliverable.destinationLocationLatitude}, long:{" "}
        {selectedDeliverable.destinationLocationLongitude}
      </h5>
      <h4>Courier actual location:</h4>
      <h5>
        lat: {actualLatitude}, long: {actualLongitude}
      </h5>
    </div>
  );
}
