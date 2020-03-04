import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme
} from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { colors } from "../../../assets/colors";
import { RootState } from "../../../shared/store/rootReducer";
import { Deliverable } from "../models/deliverable";
import { setSelectedDeliverable } from "../store/deliverablesStore";
import {
  DeliverableState,
  getDeliverableState
} from "../store/deliverableState";
import { DeliverableIcon } from "./DeliverableIcon";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: `0 0 5px ${colors.blue}`
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  list: {
    padding: 0,
    width: "100%"
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: colors.lightBlue,
      transition: "0.5s"
    }
  },
  listItemText: {}
}));

export function DeliverablesList() {
  const classes = useStyles();
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
    <div className={classes.root}>
      <div className={classes.title}>Orders</div>
      <List className={classes.list}>
        {deliverables.map(deliverable => (
          <ListItem
            key={deliverable.id}
            onClick={handleItemClick(deliverable)}
            className={classes.listItem}
          >
            <ListItemAvatar>
              <DeliverableIcon deliverable={deliverable} />
            </ListItemAvatar>
            <ListItemText
              primary={deliverable.name}
              secondary={getSecondaryText(deliverable)}
              className={classes.listItemText}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

const getSecondaryText = (deliverable: Deliverable) => {
  const deliverableState = getDeliverableState(deliverable);
  switch (deliverableState) {
    case DeliverableState.PLACED:
      return "Placed";
    case DeliverableState.ACCEPTED:
      return "Accepted";
    case DeliverableState.DELIVERING:
      return "Delivering";
    case DeliverableState.DELIVERED:
      return "Delivered";
  }
};
