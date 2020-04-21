import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/rootReducer";
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
  const selectedDeliverable = useSelector(
    (state: RootState) => state.deliverablesReducer.selectedDeliverable
  );
  const deliverableLocations = useSelector(
    (state: RootState) => state.deliverablesReducer.deliverableLocations
  );
  const actualLatitude = deliverableLocations.find(
    (dl) =>
      dl.courierUserName === selectedDeliverable.courierUserName &&
      selectedDeliverable.accepted === true &&
      selectedDeliverable.delivered === false
  )?.latitude;
  const actualLongitude = deliverableLocations.find(
    (dl) =>
      dl.courierUserName === selectedDeliverable.courierUserName &&
      selectedDeliverable.accepted === true &&
      selectedDeliverable.delivered === false
  )?.longitude;

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
