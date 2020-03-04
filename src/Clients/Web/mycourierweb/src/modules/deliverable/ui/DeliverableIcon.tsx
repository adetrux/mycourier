import LocalShippingRounded from "@material-ui/icons/LocalShippingRounded";
import PersonPinCircleRounded from "@material-ui/icons/PersonPinCircleRounded";
import PlaceRounded from "@material-ui/icons/PlaceRounded";
import WhereToVoteRounded from "@material-ui/icons/WhereToVoteRounded";
import React from "react";
import { Deliverable } from "../models/deliverable";
import {
  DeliverableState,
  getDeliverableState
} from "../store/deliverableState";

interface DeliverableIconProps {
  deliverable: Deliverable;
}

export function DeliverableIcon({ deliverable }: DeliverableIconProps) {
  const deliverableState = getDeliverableState(deliverable);
  switch (deliverableState) {
    case DeliverableState.PLACED:
      return <PlaceRounded style={{ color: "grey" }} />;
    case DeliverableState.ACCEPTED:
      return <PersonPinCircleRounded style={{ color: "#1565c0" }} />;
    case DeliverableState.DELIVERING:
      return <LocalShippingRounded style={{ color: "orange" }} />;
    case DeliverableState.DELIVERED:
      return <WhereToVoteRounded style={{ color: "green" }} />;
  }
}
