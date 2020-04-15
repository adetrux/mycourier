import { makeStyles } from "@material-ui/core";
import React from "react";
import { DeliverablesControlPanel } from "../../modules/deliverable/ui/DeliverablesControlPanel";
import { MapView } from "../../modules/map/ui/MapView";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  controlPanel: {
    width: "20%",
    height: "100vh",
  },
});

export function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.controlPanel}>
        <DeliverablesControlPanel />
      </div>
      <MapView />
    </div>
  );
}
