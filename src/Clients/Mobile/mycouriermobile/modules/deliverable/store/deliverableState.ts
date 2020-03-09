import { Deliverable } from "../models/deliverable";

export enum DeliverableState {
  PLACED,
  ACCEPTED,
  DELIVERING,
  DELIVERED
}

export const getDeliverableState = ({
  accepted,
  delivering,
  delivered
}: Deliverable) => {
  if (!accepted) {
    return DeliverableState.PLACED;
  } else if (accepted && !delivering) {
    return DeliverableState.ACCEPTED;
  } else if (delivering && !delivered) {
    return DeliverableState.DELIVERING;
  } else {
    return DeliverableState.DELIVERED;
  }
};
