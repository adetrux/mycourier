import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { colors } from "../../../assets/colors";
import { Deliverable } from "../models/deliverable";
import { addDeliverable } from "../store/deliverablesStore";

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
    // margin: theme.spacing(2),
    // border: "0px",
    borderRadius: theme.spacing(2),
    backgroundColor: colors.lightBlue,
    borderColor: `${colors.lightBlue} !important`
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
  const [deliverableName, setDeliverableName] = useState();
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
          isNaN(deliverableStart) || deliverableStart === null
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
          isNaN(deliverableEnd) || deliverableEnd === null ? "" : deliverableEnd
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
        onClick={createDeliverable}
        className={classes.button}
      >
        Create
      </Button>
    </div>
  );
}
