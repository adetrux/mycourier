import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import { HubConnection } from "@microsoft/signalr";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { colors } from "../../../assets/colors";
import { Deliverable } from "../models/deliverable";
import { deliverablesService } from "../service/deliverablesService";
import { createDeliverable } from "../store/deliverablesStore";

const inputVariant = "outlined";
const inputValue = (value: number | null) =>
  isNaN(value!) || value === null ? "" : value;

const inputProps = {
  step: 0.001,
};

const useStyles = makeStyles((theme: Theme) => ({
  panel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: `0 0 5px ${colors.blue}`,
  },
  title: {},
  inputRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  input: {
    borderRadius: theme.spacing(2),
    backgroundColor: colors.lightBlue,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: theme.spacing(2),
    "&:hover": {
      color: colors.blue,
      backgroundColor: colors.lightBlue,
      transition: "0.5s",
    },
  },
}));

interface CreateDeliverableProps {
  deliverableHubConnection: HubConnection;
}

export function CreateDeliverable({
  deliverableHubConnection,
}: CreateDeliverableProps) {
  const classes = useStyles();
  const InputProps = {
    className: classes.input,
  };
  const dispatch = useDispatch();

  deliverableHubConnection.on("DeliverableCreated", () => {
    console.log("deliverable created");
  });

  const [deliverableName, setDeliverableName] = useState<string>("Test");
  const [deliverableStartLatitude, setDeliverableStartLatitude] = useState<
    number | null
  >(47.515249);
  const [deliverableStartLongitude, setDeliverableStartLongitude] = useState<
    number | null
  >(19.147091);
  const [deliverableEndLatitude, setDeliverableEndLatitude] = useState<
    number | null
  >(47.505249);
  const [deliverableEndLongitude, setDeliverableEndLongitude] = useState<
    number | null
  >(19.157091);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDeliverableName(event.target.value);
  };

  const handleStartLatitudeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDeliverableStartLatitude(parseFloat(event.target.value));
  };

  const handleStartLongitudeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDeliverableStartLongitude(parseFloat(event.target.value));
  };

  const handleEndLatitudeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDeliverableEndLatitude(parseFloat(event.target.value));
  };

  const handleEndLongitudeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDeliverableEndLongitude(parseFloat(event.target.value));
  };

  const handleCreateDeliverable = useCallback(() => {
    const deliverableToCreate: Deliverable = {
      id: v4(),
      createdTime: Date.now(),
      name: deliverableName,
      startLocationLatitude: deliverableStartLatitude!,
      startLocationLongitude: deliverableStartLongitude!,
      destinationLocationLatitude: deliverableEndLatitude!,
      destinationLocationLongitude: deliverableEndLongitude!,
      accepted: false,
      delivering: false,
      delivered: false,
    };
    deliverablesService.createDeliverable(deliverableToCreate);
    dispatch(createDeliverable(deliverableToCreate));
    deliverableHubConnection.invoke("CreateDeliverable", deliverableToCreate);
    setDeliverableName("");
    setDeliverableStartLatitude(null);
    setDeliverableStartLongitude(null);
    setDeliverableEndLatitude(null);
    setDeliverableEndLongitude(null);
  }, [
    deliverableName,
    deliverableStartLatitude,
    deliverableStartLongitude,
    deliverableEndLatitude,
    deliverableEndLongitude,
    dispatch,
    deliverableHubConnection,
  ]);

  return (
    <div className={classes.panel}>
      <div className={classes.title}>Create order</div>
      <div className={classes.inputRow}>
        <TextField
          id="name"
          label="Name"
          variant={inputVariant}
          value={deliverableName || ""}
          onChange={handleNameChange}
          margin="normal"
          InputProps={InputProps}
        />
      </div>
      <div className={classes.inputRow}>
        <TextField
          id="startLat"
          label="Start lat"
          variant={inputVariant}
          type="number"
          value={inputValue(deliverableStartLatitude)}
          onChange={handleStartLatitudeChange}
          margin="normal"
          InputProps={InputProps}
          inputProps={inputProps}
        />
        <TextField
          id="startLong"
          label="Start long"
          variant={inputVariant}
          type="number"
          value={inputValue(deliverableStartLongitude)}
          onChange={handleStartLongitudeChange}
          margin="normal"
          InputProps={InputProps}
          inputProps={inputProps}
        />
      </div>
      <div className={classes.inputRow}>
        <TextField
          id="endLat"
          label="End lat"
          variant={inputVariant}
          type="number"
          value={inputValue(deliverableEndLatitude)}
          onChange={handleEndLatitudeChange}
          margin="normal"
          InputProps={InputProps}
          inputProps={inputProps}
        />
        <TextField
          id="endLong"
          label="End long"
          variant="outlined"
          type="number"
          value={inputValue(deliverableEndLongitude)}
          onChange={handleEndLongitudeChange}
          margin="normal"
          InputProps={InputProps}
          inputProps={inputProps}
        />
      </div>
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
