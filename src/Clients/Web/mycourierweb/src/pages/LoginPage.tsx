import { makeStyles } from "@material-ui/core";
import React from "react";
import { LoginBackgroundView } from "../modules/user/ui/LoginBackgroundView";
import { LoginPanel } from "../modules/user/ui/LoginPanel";

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

export function LoginPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.controlPanel}>
        <LoginPanel />
      </div>
      <LoginBackgroundView />
    </div>
  );
}
