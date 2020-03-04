import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme
} from "@material-ui/core";
import LocationOnRounded from "@material-ui/icons/LocationOnRounded";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../shared/store/rootReducer";
import { Deliverable } from "../models/deliverable";
import { setSelectedDeliverable } from "../store/deliverablesStore";

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: "90%",
    marginTop: theme.spacing(2),
    padding: 0,
    borderRadius: theme.spacing(2),
    boxShadow: "0 0 5px"
  },
  listItem: {
    cursor: "pointer",
    borderRadius: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#d67",
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
    <List className={classes.list}>
      {deliverables.map(deliverable => (
        <ListItem
          key={deliverable.id}
          onClick={handleItemClick(deliverable)}
          className={classes.listItem}
        >
          <ListItemAvatar>
            <Avatar>
              <LocationOnRounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={deliverable.name}
            secondary={
              "start:" + deliverable.start + ", end: " + deliverable.end
            }
            className={classes.listItemText}
          />
        </ListItem>
      ))}
    </List>
  );
}
