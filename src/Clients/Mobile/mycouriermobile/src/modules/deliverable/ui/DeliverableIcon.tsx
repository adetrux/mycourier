import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Deliverable } from "../models/deliverable";
import {
  DeliverableStateType,
  getDeliverableState,
} from "../store/deliverableState";

interface DeliverableIconProps {
  deliverable: Deliverable;
}

export function DeliverableIcon({ deliverable }: DeliverableIconProps) {
  const deliverableState = getDeliverableState(deliverable);
  switch (deliverableState.type) {
    case DeliverableStateType.PLACED:
      return <Icon name="place" size={26} color="grey" />;
    case DeliverableStateType.ACCEPTED:
      return <Icon name="person-pin-circle" size={26} color="#1565c0" />;
    case DeliverableStateType.DELIVERING:
      return <Icon name="local-shipping" size={26} color="blue" />;
    case DeliverableStateType.DELIVERED:
      return <Icon name="check" size={26} color="green" />;
  }
}
