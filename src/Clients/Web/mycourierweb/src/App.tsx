import { makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { DeliverablesPage } from "./pages/deliverables/DeliverablesPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";
import { AppDrawer } from "./shared/ui/AppDrawer";

const useStyles = makeStyles({
  page: {
    height: "100%",
    width: "100%",
    position: "absolute",
    paddingLeft: 200,
    backgroundColor: "#d67"
  }
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div>
        <AppDrawer />

        <Switch>
          <Route path="/deliverables">
            <div className={classes.page}>
              <DeliverablesPage />
            </div>
          </Route>
          <Route path="/tracks">
            <div className={classes.page}>
              <TrackingPage />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
