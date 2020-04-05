import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { colors } from "../../../assets/colors";
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
    paddingLeft: theme.spacing(2),
    backgroundColor: colors.blue,
  },
}));

export function MapView() {
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
