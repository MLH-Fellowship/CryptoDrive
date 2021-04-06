import React from "react";
import LoginUI from "./pages/Login/";
import SignUpUI from "./pages/SignUp";
import * as ROUTES from "./constants/routes";
import { Route, Switch, useLocation } from "react-router-dom";
import VerticalTabs from "./pages/Dashboard/index";
import Landing from "../src/pages/Landing";
export default function App() {
  const location = useLocation();

  return (
    <>
      {console.log(location.pathname)}
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path={ROUTES.SIGN_IN}>
          <LoginUI />
        </Route>
        <Route exact path={ROUTES.SIGN_UP}>
          <SignUpUI />
        </Route>
        <Route exact path={ROUTES.DASHBOARD}>
          <div className="MainContent">
            <VerticalTabs />
          </div>
        </Route>
      </Switch>
    </>
  );
}
