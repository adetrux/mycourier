import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHubConnection } from "../../../shared/hub/hub";
import { hubUrl } from "../../../shared/service/url";
import {
  setActualLatitude,
  setActualLongitude
} from "../../tracking/store/trackingStore";
import { CreateDeliverable } from "./CreateDeliverable";
import { DeliverablesList } from "./DeliverablesList";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    overflowY: "scroll"
  }
}));

export function DeliverablesControlPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deliverableHubConnection = useHubConnection(hubUrl.deliverableHubUrl);
  const trackingHubConnection = useHubConnection(hubUrl.trackingHubUrl);
  trackingHubConnection.on(
    "ActualLocationSent",
    (actualLatitude, actualLongitude) => {
      console.log("actual latitude: ", actualLatitude);
      console.log("actual longitude: ", actualLongitude);
      dispatch(setActualLatitude(actualLatitude));
      dispatch(setActualLongitude(actualLongitude));
    }
  );
  return (
    <div className={classes.root}>
      <h1>Deliverables</h1>
      <CreateDeliverable deliverableHubConnection={deliverableHubConnection} />
      <DeliverablesList deliverableHubConnection={deliverableHubConnection} />
    </div>
  );
}
