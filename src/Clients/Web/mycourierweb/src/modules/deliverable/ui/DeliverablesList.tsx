import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/rootReducer";

export function DeliverablesList() {
  const deliverables = useSelector(
    (state: RootState) => state.deliverablesReducer.deliverables
  );
  return (
    <List>
      {deliverables.map(deliverable => (
        <ListItem key={deliverable.id}>
          <ListItemText
            primary={deliverable.name}
            secondary={
              "start:" + deliverable.start + ", end: " + deliverable.end
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
