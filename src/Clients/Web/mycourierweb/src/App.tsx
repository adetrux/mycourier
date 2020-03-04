import { makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
  },
  map: {
    height: "100vh",
    width: "80%",
    padding: 0,
    backgroundColor: "#d67"
  }
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <div className={classes.controlPanel}>
          <DeliverablesControlPanel />
        </div>

        <Switch>
          <Route path="/tracking/:id" component={Map} />
          <Route path="/">
            <div className={classes.map}>
              <h1>No track selected</h1>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
