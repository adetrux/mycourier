import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { colors } from "../../../assets/colors";
import { RootState } from "../../../shared/store/rootReducer";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
    width: "80%",
    paddingLeft: theme.spacing(2),
    backgroundColor: colors.blue
  }
}));

interface MapMatchParams {
  id: string;
}

interface MapProps extends RouteComponentProps<MapMatchParams> {}

export function Map({ match }: MapProps) {
  const classes = useStyles();
  const selectedDeliverable = useSelector(
    (state: RootState) => state.deliverablesReducer.selectedDeliverable
  );
  return (
    <div className={classes.root}>
      <h1>Tracking package: {selectedDeliverable.name}</h1>
      <h4>Package ID: {match.params.id}</h4>
      <h4>Starting location: {selectedDeliverable.start}</h4>
      <h4>Destination location: {selectedDeliverable.end}</h4>
    </div>
  );
}
