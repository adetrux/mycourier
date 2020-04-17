import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { colors } from "../../../assets/colors";

const useStyles = makeStyles((theme: Theme) => ({
  map: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "80%",
    paddingLeft: theme.spacing(2),
    backgroundColor: colors.lightBlue,
  },
}));

export function LoginBackgroundView() {
  const classes = useStyles();
  return (
    <div className={classes.map}>
      <h1>MyCourier</h1>
      <h2>
        <i>a service for tracking couriers.</i>
      </h2>
    </div>
  );
}
