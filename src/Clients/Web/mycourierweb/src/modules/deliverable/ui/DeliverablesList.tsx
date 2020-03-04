import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../shared/store/rootReducer";
import { Deliverable } from "../models/deliverable";
import { setSelectedDeliverable } from "../store/deliverablesStore";

export function DeliverablesList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const deliverables = useSelector(
    (state: RootState) => state.deliverablesReducer.deliverables
  );

  const handleItemClick = useCallback(
    (deliverable: Deliverable) => () => {
      dispatch(setSelectedDeliverable(deliverable));
      history.push(`/tracking/${deliverable.id}`);
    },
    [dispatch, history]
  );

  return (
    <List>
      {deliverables.map(deliverable => (
        <ListItem key={deliverable.id} onClick={handleItemClick(deliverable)}>
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
