import React from "react";
import { DragAndDrop, Header, Home, Footer } from "./components";
import { LoginUI, SignUpUI } from "./components/AuthUIs";
import * as ROUTES from "./constants/routes";
import { Route, Switch, useLocation } from "react-router-dom";
import { Container } from "@material-ui/core";

export default function App() {
  const location = useLocation();

  return (
    <>
      {console.log(location.pathname)}
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="MainContent">
            <Container>
              <Home />
            </Container>
          </div>
          <Footer label="Crypto Drive" link="/" linkText="You are at Home" />
        </Route>
        <Route exact path={ROUTES.SIGN_IN}>
          <div className="MainContent">
            {" "}
            <Container>
              <LoginUI />
            </Container>
          </div>

          <Footer
            label="Dont Have an Account?"
            link={ROUTES.SIGN_UP}
            linkText="Sign Up"
          />
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
              <DragAndDrop />
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
