import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { authService } from "./modules/user/auth";
import { HomePage } from "./shared/ui/HomePage";
import { LoginPage } from "./shared/ui/LoginPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={LoginPage} />
        <Route
          exact={true}
          path="/home"
          // tslint:disable-next-line: jsx-no-lambda
          render={() =>
            authService.isLoggedIn() === "true" ? (
              <HomePage />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
