import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { DeliverablesPage } from "./pages/deliverables/DeliverablesPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";
import { AppDrawer } from "./shared/ui/AppDrawer";

const drawerWidth = 250;

const useStyles = makeStyles({
  root: {
    //display: "flex",
    //flex: 1,
    //flexDirection: "column",
    //zIndex: 1,
    //overflow: "hidden",
    //position: "relative",
    //width: "100%",
    //margin: 0
  },
  page: {
    //flexGrow: 1,
    height: "100%",
    width: "100%",
    //overflow: "hidden",
    position: "absolute",
    paddingLeft: 200,
    backgroundColor: "#d67"
  }
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <AppDrawer />

        <Switch>
          <div className={classes.page}>
            <Route path="/deliverables">
              <DeliverablesPage />
            </Route>
            <Route path="/tracks">
              <TrackingPage />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
