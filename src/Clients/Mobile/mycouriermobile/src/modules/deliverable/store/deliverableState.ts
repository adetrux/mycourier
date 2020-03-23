import { Deliverable } from "../models/deliverable";

export enum DeliverableStateType {
  PLACED,
  ACCEPTED,
  DELIVERING,
  DELIVERED
}

export interface DeliverableState {
  type: DeliverableStateType;
  name: string;
}

export const getDeliverableState = ({
  accepted,
  delivering,
  delivered
}: Deliverable): DeliverableState => {
  if (!accepted) {
    return { type: DeliverableStateType.PLACED, name: "Placed" };
  } else if (accepted && !delivering) {
    return { type: DeliverableStateType.ACCEPTED, name: "Accepted" };
  } else if (delivering && !delivered) {
    return { type: DeliverableStateType.DELIVERING, name: "Delivering" };
  } else {
    return { type: DeliverableStateType.DELIVERED, name: "Delivered" };
  }
};
