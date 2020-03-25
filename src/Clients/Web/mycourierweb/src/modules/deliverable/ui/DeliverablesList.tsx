import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme
} from "@material-ui/core";
import { HubConnection } from "@microsoft/signalr";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../assets/colors";
import { RootState } from "../../../shared/store/rootReducer";
import { Deliverable } from "../models/deliverable";
import { deliverablesService } from "../service/deliverablesService";
import {
  setDeliverables,
  setSelectedDeliverable,
  updateDeliverable
} from "../store/deliverablesStore";
import { getDeliverableState } from "../store/deliverableState";
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

interface DeliverablesListProps {
  deliverableHubConnection: HubConnection;
}

export function DeliverablesList({
  deliverableHubConnection
}: DeliverablesListProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  deliverableHubConnection.on(
    "DeliverableUpdated",
    (deliverable: Deliverable) => {
      dispatch(updateDeliverable(deliverable));
    }
  );

  useEffect(() => {
    async function fetchDeliverables() {
      const fetchedDeliverables = await deliverablesService.getDeliverables();
      dispatch(setDeliverables(fetchedDeliverables));
    }

    fetchDeliverables();
  }, [dispatch]);

  const deliverables = useSelector(
    (state: RootState) => state.deliverablesReducer.deliverables
  );

  const handleItemClick = useCallback(
    (deliverable: Deliverable) => () => {
      dispatch(setSelectedDeliverable(deliverable));
    },
    [dispatch]
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
              secondary={getDeliverableState(deliverable).name}
              className={classes.listItemText}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
