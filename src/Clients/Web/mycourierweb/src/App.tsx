import { makeStyles } from "@material-ui/core";
import React from "react";
import "./App.css";
import { DeliverablesControlPanel } from "./modules/deliverable/ui/DeliverablesControlPanel";
import { Map } from "./modules/map/ui/Map";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  controlPanel: {
    width: "20%",
    height: "100vh"
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.controlPanel}>
        <DeliverablesControlPanel />
      </div>
      <Map />
    </div>
  );
}

export default App;
