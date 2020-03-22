import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { colors } from "../../../assets/colors";
import { useConnection } from "../../../shared/hub/hub";
import { hubUrl } from "../../../shared/service/url";
import { Deliverable } from "../models/deliverable";
import {
  createDeliverable,
  updateDeliverable
} from "../store/deliverablesStore";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: `0 0 5px ${colors.blue}`
  },
  title: {},
  input: {
    borderRadius: theme.spacing(2),
    backgroundColor: colors.lightBlue
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: theme.spacing(2),
    "&:hover": {
      color: colors.blue,
      backgroundColor: colors.lightBlue,
      transition: "0.5s"
    }
  }
}));

export function CreateDeliverable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const hubConnection = useConnection(hubUrl.deliverableHubUrl);
  hubConnection.on("DeliverableCreated", () => {
    console.log("deliverable created");
  });

  hubConnection.on("DeliverableUpdated", (deliverable: Deliverable) => {
    dispatch(updateDeliverable(deliverable));
  });

  const [deliverableName, setDeliverableName] = useState<string>("");
  const [deliverableStart, setDeliverableStart] = useState<number | null>(null);
  const [deliverableEnd, setDeliverableEnd] = useState<number | null>(null);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDeliverableName(event.target.value);
  };

  const handleStartChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDeliverableStart(parseInt(event.target.value, 10));
  };

  const handleEndChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDeliverableEnd(parseInt(event.target.value, 10));
  };

  const handleCreateDeliverable = useCallback(() => {
    const deliverableToCreate: Deliverable = {
      id: v4(),
      createdTime: Date.now(),
      name: deliverableName,
      customerId: "1",
      customerFirstName: "Bob",
      customerLastName: "Sbdy",
      startLocationLatitude: deliverableStart!,
      startLocationLongitude: deliverableStart!,
      destinationLocationLatitude: deliverableEnd!,
      destinationLocationLongitude: deliverableEnd!,
      accepted: false,
      delivering: false,
      delivered: false
    };
    dispatch(createDeliverable(deliverableToCreate));
    hubConnection.invoke("CreateDeliverable", deliverableToCreate);
    setDeliverableName("");
    setDeliverableStart(null);
    setDeliverableEnd(null);
  }, [
    deliverableEnd,
    deliverableName,
    deliverableStart,
    dispatch,
    hubConnection
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>Create order</div>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={deliverableName || ""}
        onChange={handleNameChange}
        margin="normal"
        InputProps={{
          className: classes.input
        }}
      />
      <TextField
        id="start"
        label="Start"
        variant="outlined"
        type="number"
        value={
          isNaN(deliverableStart!) || deliverableStart === null
            ? ""
            : deliverableStart
        }
        onChange={handleStartChange}
        margin="normal"
        InputProps={{
          className: classes.input
        }}
      />
      <TextField
        id="end"
        label="End"
        variant="outlined"
        type="number"
        value={
          isNaN(deliverableEnd!) || deliverableEnd === null
            ? ""
            : deliverableEnd
        }
        onChange={handleEndChange}
        margin="normal"
        InputProps={{
          className: classes.input
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateDeliverable}
        className={classes.button}
      >
        Create
      </Button>
    </div>
  );
}
