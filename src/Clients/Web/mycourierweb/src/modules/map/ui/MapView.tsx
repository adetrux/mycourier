import { makeStyles, Theme } from "@material-ui/core";
import React, { useMemo } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { buildHubConnection } from "../../../shared/hub/hub";
import { hubUrl } from "../../../shared/service/url";
import { RootState } from "../../../shared/store/rootReducer";
import { DeliverableLocation } from "../../deliverable/models/deliverableLocation";
import { addDeliverableLocation } from "../../deliverable/store/deliverablesStore";
import {
  actualMarkerIcon,
  destinationMarkerIcon,
  startMarkerIcon,
} from "./markerIcons";

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tileAttribution =
  "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>";

const useStyles = makeStyles((theme: Theme) => ({
  map: {
    height: "100vh",
    width: "80%",
  },
}));

export function MapView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedDeliverable = useSelector(
    (state: RootState) => state.deliverablesReducer.selectedDeliverable
  );
  const deliverableLocations = useSelector(
    (state: RootState) => state.deliverablesReducer.deliverableLocations
  );

  const actualLatitude = useMemo(() => {
    return deliverableLocations.find(
      (dl) =>
        dl.courierUserName === selectedDeliverable.courierUserName &&
        selectedDeliverable.accepted === true &&
        selectedDeliverable.delivered === false
    )?.latitude;
  }, [
    deliverableLocations,
    selectedDeliverable.accepted,
    selectedDeliverable.courierUserName,
    selectedDeliverable.delivered,
  ]);

  const actualLongitude = useMemo(() => {
    return deliverableLocations.find(
      (dl) =>
        dl.courierUserName === selectedDeliverable.courierUserName &&
        selectedDeliverable.accepted === true &&
        selectedDeliverable.delivered === false
    )?.longitude;
  }, [
    deliverableLocations,
    selectedDeliverable.accepted,
    selectedDeliverable.courierUserName,
    selectedDeliverable.delivered,
  ]);

  const trackingHubConnection = buildHubConnection(hubUrl.trackingHubUrl);
  trackingHubConnection.on(
    "ActualLocationSent",
    (courierUserName: string, latitude?: number, longitude?: number) => {
      const deliverableLocation: DeliverableLocation = {
        courierUserName,
        latitude,
        longitude,
      };
      dispatch(addDeliverableLocation(deliverableLocation));
    }
  );

  const center = [47.505249, 19.137091];

  const actualLocationMarker = () =>
    actualLatitude &&
    actualLongitude && (
      <Marker
        position={[actualLatitude, actualLongitude]}
        icon={actualMarkerIcon(selectedDeliverable)}
      />
    );

  const startLocationMarker = () =>
    selectedDeliverable &&
    selectedDeliverable.startLocationLatitude &&
    selectedDeliverable.startLocationLongitude && (
      <Marker
        position={[
          selectedDeliverable.startLocationLatitude,
          selectedDeliverable.startLocationLongitude,
        ]}
        icon={startMarkerIcon(selectedDeliverable)}
      />
    );

  const destinationLocationMarker = () =>
    selectedDeliverable &&
    selectedDeliverable.destinationLocationLatitude &&
    selectedDeliverable.destinationLocationLongitude && (
      <Marker
        position={[
          selectedDeliverable.destinationLocationLatitude,
          selectedDeliverable.destinationLocationLongitude,
        ]}
        icon={destinationMarkerIcon}
      />
    );

  return (
    <Map
      center={[center[0], center[1]]}
      zoom={13}
      maxZoom={18}
      className={classes.map}
    >
      <TileLayer url={tileUrl} attribution={tileAttribution} />
      {actualLocationMarker()}
      {startLocationMarker()}
      {destinationLocationMarker()}
    </Map>
  );
}
