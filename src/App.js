import React from "react";
import { Header, Home, Footer } from "./components";
import Dashboard from "./pages/Dashboard/dashbaord";
import LoginUI from "./pages/Login/";
import SignUpUI from "./pages/SignUp";
import * as ROUTES from "./constants/routes";
import { Route, Switch, useLocation } from "react-router-dom";
import { Container } from "@material-ui/core";
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
          {/* <div className="MainContent"> */}
            {/* {" "} */}
            {/* <Container> */}
              <LoginUI />
            {/* </Container> */}
          {/* </div> */}

          {/* <Footer
            label="Dont Have an Account?"
            link={ROUTES.SIGN_UP}
            linkText="Sign Up"
          /> */}
        </Route>
        <Route exact path={ROUTES.SIGN_UP}>
          <div className="MainContent">
            <Container>
              <SignUpUI />
            </Container>
          </div>
          <Footer
            label="Already Have an Account?"
            link={ROUTES.SIGN_IN}
            linkText="Sign in"
          />
        </Route>
        <Route exact path={ROUTES.DASHBOARD}>
          <div className="MainContent">
            <Container>
              <VerticalTabs />
            </Container>
          </div>
          <Footer
            label="We save you from getting hijacked by Big Techies"
            link="/"
            linkText="Thank you For Using CryptoDrive"
          />
        </Route>
      </Switch>
    </>
  );
}
