import React from "react";
import LoginUI from "./pages/Login/";
import SignUpUI from "./pages/SignUp";
import * as ROUTES from "./constants/routes";
import { Route, Switch, useLocation } from "react-router-dom";
import { HashRouter as Router } from 'react-router-dom'
import VerticalTabs from "./pages/Dashboard/index";
import Landing from "../src/pages/Landing";
export default function App() {
  const location = useLocation();

  return (
    <>
    <Router basename="/">
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
      </Router>
    </>
  );
}
