import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { CreateDeliverable } from "./CreateDeliverable";
import { DeliverablesList } from "./DeliverablesList";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    overflowY: "scroll"
  }
}));

export function DeliverablesControlPanel() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Deliverables</h1>
      <CreateDeliverable />
      <DeliverablesList />
    </div>
  );
}
