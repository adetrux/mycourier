import L from "leaflet";
import { Deliverable } from "../../deliverable/models/deliverable";
import {
  DeliverableStateType,
  getDeliverableState,
} from "../../deliverable/store/deliverableState";

export const startMarkerIcon = (selectedDeliverable: Deliverable) =>
  new L.Icon({
    iconUrl:
      stateIsDelivering(selectedDeliverable) ||
      stateIsDelivered(selectedDeliverable)
        ? require("../../../assets/icons/room-grey-24px.svg")
        : require("../../../assets/icons/room-blue-24px.svg"),
    iconAnchor: new L.Point(12, 24),
    popupAnchor: new L.Point(0, -24),
  });

export const destinationMarkerIcon = new L.Icon({
  iconUrl: require("../../../assets/icons/home-24px.svg"),
  iconAnchor: new L.Point(12, 24),
  popupAnchor: new L.Point(0, -24),
});

export const actualMarkerIcon = (selectedDeliverable: Deliverable) =>
  new L.Icon({
    iconUrl: stateIsDelivering(selectedDeliverable)
      ? require("../../../assets/icons/local_shipping-blue-24px.svg")
      : require("../../../assets/icons/local_shipping-black-24px.svg"),
    iconAnchor: new L.Point(12, 24),
    popupAnchor: new L.Point(0, -24),
  });

const stateIsDelivering = (selectedDeliverable: Deliverable) => {
  return (
    getDeliverableState(selectedDeliverable).type ===
    DeliverableStateType.DELIVERING
  );
};

const stateIsDelivered = (selectedDeliverable: Deliverable) => {
  return (
    getDeliverableState(selectedDeliverable).type ===
    DeliverableStateType.DELIVERED
  );
};
