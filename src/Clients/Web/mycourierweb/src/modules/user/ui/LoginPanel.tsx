import {
  Button,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKey from "@material-ui/icons/VpnKey";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { colors } from "../../../assets/colors";
import { userService } from "../userService";

const inputVariant = "outlined";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    overflowY: "scroll",
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: `0 0 5px ${colors.blue}`,
  },
  form: {},
  input: {
    borderRadius: theme.spacing(2),
    backgroundColor: colors.lightBlue,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: colors.blue,
    borderRadius: theme.spacing(2),
    "&:hover": {
      color: colors.blue,
      backgroundColor: colors.lightBlue,
      transition: "0.5s",
    },
  },
}));

export function LoginPanel() {
  const classes = useStyles();
  const EmailInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <AccountCircle />
      </InputAdornment>
    ),
    className: classes.input,
  };

  const PasswordInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <VpnKey />
      </InputAdornment>
    ),
    className: classes.input,
  };

  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleLogin = useCallback(async () => {
    const loginSuccess = await userService.login(email, password);
    if (loginSuccess) {
      history.push("/home");
    }
  }, [email, history, password]);

  return (
    <div className={classes.root}>
      <h3>Sign in</h3>
      <div className={classes.panel}>
        <TextField
          id="email"
          helperText="Email"
          type="text"
          variant={inputVariant}
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          InputProps={EmailInputProps}
        />
        <TextField
          id="password"
          helperText="Password"
          type="password"
          variant={inputVariant}
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
          InputProps={PasswordInputProps}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className={classes.button}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
