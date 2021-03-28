import React from "react";
import { Grid, Button } from "@material-ui/core";
import Typist from "react-text-typist";
import "./home.css";
const Login = () => {
  return (
    <div className="top-container">
      <Typist
        className="typist-custom"
        cursorSmooth={true}
        cursorDelay={100000}
        sentences={["Secure", "Fast", "Private"]}
      />
      <div className="title">
        Welcome to CrytpoDrive, your one stop solution to fast secure storage.
      </div>
      <div className="button-container">
        <Button
          style={{
            borderRadius: 25,
            backgroundColor: "#2b3b4e",
            color: "white",
          }}
          href="/signin"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Login;

//<div className="title">
// Welcome to CrytpoDrive, your one stop solution to fast secure storage
// </div>
