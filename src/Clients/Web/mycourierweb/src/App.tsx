import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { authService } from "./modules/user/authService";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

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
            authService.isLoggedIn() ? <HomePage /> : <Redirect to="/" />
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
