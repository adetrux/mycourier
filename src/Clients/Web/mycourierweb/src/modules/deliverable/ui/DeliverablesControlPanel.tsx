import { IconButton, makeStyles, Theme, Tooltip } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { colors } from "../../../assets/colors";
import { useHubConnection } from "../../../shared/hub/hub";
import { hubUrl } from "../../../shared/service/url";
import { authService } from "../../user/authService";
import { DeliverableLocation } from "../models/deliverableLocation";
import { addDeliverableLocation } from "../store/deliverablesStore";
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
    (
      courierUserName: string,
      actualLatitude?: number,
      actualLongitude?: number
    ) => {
      const deliverableLocation: DeliverableLocation = {
        courierUserName,
        latitude: actualLatitude,
        longitude: actualLongitude,
      };
      dispatch(addDeliverableLocation(deliverableLocation));
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
      <CreateDeliverable deliverableHubConnection={deliverableHubConnection} />
      <DeliverablesList deliverableHubConnection={deliverableHubConnection} />
    </div>
  );
}
