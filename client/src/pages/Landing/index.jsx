import React from "react";
import { Grid, Button } from "@material-ui/core";
import Typist from "react-text-typist";
import "./landing.css";
const Login = () => {
  return (
    <div className="top-container">
      <Typist
        className="typist-custom"
        cursorSmooth={true}
        cursorDelay={100000}
        sentences={["Secure", "Fast", "Decentralized", "Serverless"]}
      />
      <div className="title">
      <center>  Welcome to CrytpoDrive, your one stop solution to fast, secure, decentralized and serverless storage.</center>
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
