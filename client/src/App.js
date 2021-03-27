import React, { useState } from "react";
import { DragAndDrop, Header, Home, Footer } from "./components";
import { LoginUI, SignUpUI } from "./components/AuthUIs";
import * as ROUTES from "./constants/routes";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useLocation,
} from "react-router-dom";
import { Container } from "@material-ui/core";

export default function App() {
  const location = useLocation();

  return (
    <>
      {console.log(location.pathname)}
      <Header />
      <Switch>
        <Route exact path='/'>
          <Container>
            <Home />
          </Container>
          <Footer
            label="Crypto Drive"
            link='/'
            linkText="You are at Home"
          />
        </Route>
        <Route exact path={ROUTES.SIGN_IN}>
          <Container>
            <LoginUI />
          </Container>
          <Footer
            label="Dont Have an Account?"
            link={ROUTES.SIGN_UP}
            linkText="Sign Up"
          />
        </Route>
        <Route exact path={ROUTES.SIGN_UP}>
          <Container>
            <SignUpUI />
          </Container>

          <Footer
            label="Already Have an Account?"
            link={ROUTES.SIGN_IN}
            linkText="Sign in"
          />
        </Route>
        <Route exact path={ROUTES.DASHBOARD}>
          <Container>
            <DragAndDrop />
          </Container>
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
