import React from "react";
import { CreateDeliverable } from "./CreateDeliverable";
import { DeliverablesList } from "./DeliverablesList";

export function Deliverables() {
  return (
    <>
      <CreateDeliverable />
      <DeliverablesList />
    </>
  );
}
