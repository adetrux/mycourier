import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { Deliverable } from "../models/deliverable";
import { addDeliverable } from "../store/deliverablesStore";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    paddig: theme.spacing(1)
  }
}));

export function CreateDeliverable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [deliverableName, setDeliverableName] = useState("");
  const [deliverableStart, setDeliverableStart] = useState();
  const [deliverableEnd, setDeliverableEnd] = useState();

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

  const createDeliverable = useCallback(() => {
    const deliverableToAdd: Deliverable = {
      id: v4(),
      name: deliverableName,
      start: deliverableStart,
      end: deliverableEnd,
      accepted: false,
      delivering: false,
      delivered: false
    };
    dispatch(addDeliverable(deliverableToAdd));
    setDeliverableName("");
    setDeliverableStart("");
    setDeliverableEnd("");
  }, [deliverableEnd, deliverableName, deliverableStart, dispatch]);

  return (
    <div>
      <form className={classes.form}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={deliverableName || ""}
          onChange={handleNameChange}
        />
        <TextField
          id="start"
          label="Start"
          variant="outlined"
          type="number"
          value={deliverableStart || ""}
          onChange={handleStartChange}
        />
        <TextField
          id="end"
          label="End"
          variant="outlined"
          type="number"
          value={deliverableEnd || ""}
          onChange={handleEndChange}
        />
        <Button variant="contained" color="primary" onClick={createDeliverable}>
          Create
        </Button>
      </form>
    </div>
  );
}
