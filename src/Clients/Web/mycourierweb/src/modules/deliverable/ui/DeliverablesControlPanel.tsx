import { IconButton, makeStyles, Theme, Tooltip } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { colors } from "../../../assets/colors";
import { useHubConnection } from "../../../shared/hub/hub";
import { hubUrl } from "../../../shared/service/url";
import {
  setActualLatitude,
  setActualLongitude,
} from "../../tracking/store/trackingStore";
import { authService } from "../../user/auth";
import { CreateDeliverable } from "./CreateDeliverable";
import { DeliverablesList } from "./DeliverablesList";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    overflowY: "scroll",
  },
  logoutIcon: {
    marginTop: theme.spacing(1),
    "&:hover": {
      backgroundColor: colors.lightBlue,
    },
  },
}));

export function DeliverablesControlPanel() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const deliverableHubConnection = useHubConnection(hubUrl.deliverableHubUrl);
  const trackingHubConnection = useHubConnection(hubUrl.trackingHubUrl);
  trackingHubConnection.on(
    "ActualLocationSent",
    (actualLatitude?: number, actualLongitude?: number) => {
      console.log("actual latitude: ", actualLatitude);
      console.log("actual longitude: ", actualLongitude);
      dispatch(setActualLatitude(actualLatitude));
      dispatch(setActualLongitude(actualLongitude));
    }
  );

  const handleLogout = useCallback(() => {
    authService.logout();
    history.push("/");
  }, [history]);

  return (
    <div className={classes.root}>
      <Tooltip title="Sign out">
        <IconButton
          className={classes.logoutIcon}
          onClick={handleLogout}
          size="small"
          color="primary"
        >
          <ExitToApp />
        </IconButton>
      </Tooltip>
      {/* <h1>Deliverables</h1> */}
      <CreateDeliverable deliverableHubConnection={deliverableHubConnection} />
      <DeliverablesList deliverableHubConnection={deliverableHubConnection} />
    </div>
  );
}
