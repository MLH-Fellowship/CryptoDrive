import React from "react";
import { TextField, Button, Card, makeStyles, Fade } from "@material-ui/core";
import GetPassHash from "../../Web3/GetPassHash";
import GetPublic from "../../Web3/GetPublicHash";
import loadWeb3 from "../../Web3/LoadWeb3";
import StringRetrive from "../../Ipfs/StringRetrive";
import ContractConnect from "../../Web3/ContractConnect";
import DefaultDecryptPrivateKey from "../../cryptography/Decryption";
import { Redirect } from "react-router-dom";
import * as ROUTES from "./../../constants/routes";
import { Grid } from "@material-ui/core";
import { Checkmark } from "../../components/checkmark/checkmark";
import Validator from "./../../utility/validator";
import { Whisper, Tooltip, Input } from "rsuite";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [privateKey, setPrivateKey] = React.useState("");
  const [contract, setContract] = React.useState("");
  const [publicHash, setPublicHash] = React.useState("");
  const [keyFile, setKeyFile] = React.useState("");

  const hiddenFileInput = React.useRef(null);

  const handleClick = (_event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setKeyFile(fileUploaded);
    readkeyFile(fileUploaded);
  };

  function readkeyFile(file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      setPrivateKey(evt.target.result);
      console.log(evt.target.result);
    };
    reader.onerror = () => console.log("error");
  }

  React.useEffect(() => {
    async function setup() {
      await loadWeb3();
      console.log("Web3 Loaded");
      const Contract = await ContractConnect();
      setContract(Contract);
    }
    setup();
  }, []);

  React.useEffect(() => {
    if (publicHash) {
      const json = JSON.stringify(publicHash);
      localStorage.setItem("public_hash", json);
    }
  }, [publicHash]);

  React.useEffect(() => {
    if (username) {
      const json = JSON.stringify(username);
      localStorage.setItem("user_name", json);
    }
  }, [username]);

  const buttonInlineStyle = {
    paddingTop: "3em",
  };

  const Signin = async () => {
    if (username && privateKey) {
      const public_hash = await GetPublic(contract, username);
      const pass_hash = await GetPassHash(contract, username);
      const public_key = await StringRetrive(public_hash);
      console.log(public_key);
      console.log(pass_hash);
      console.log(public_hash);
      const encrypted_pass = await StringRetrive(pass_hash);
      console.log(encrypted_pass);
      const decrypted_pass = await DefaultDecryptPrivateKey(
        encrypted_pass,
        privateKey
      );
      console.log(decrypted_pass);

      if (decrypted_pass === username);
      {
        console.log(true);
        setPublicHash(public_hash);
      }
    } else {
    }
  };

  const heading = {
    alignSelf: "flex-end",
    fontSize: "26px",
    color: "#fff",
    marginTop: "5rem",
    marginBottom: "15rem",
    paddingRight: "5rem",
  };

  const subHeading = {
    alignSelf: "flex-end",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    marginTop: "5rem",
    marginBottom: "1rem",
    margin: "1rem",
    paddingRight: "5rem",
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      height: "300px",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();

  const token = Validator("publicHash");
  const LoginUser = Validator("username");
  console.log(LoginUser);
  if (token && LoginUser) {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }

  if (publicHash !== "") {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          background: "#6163FF",
          flex: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <h2 style={heading}>
          Sign in to your account to upload, acess or share your files
        </h2>
        {username.length > 5 && (
          <Fade in={true}>
            <p style={subHeading}>
              Please add your Private Key, this won't leave your browser
              {/* <br />
          <p style={{ fontSize: "16px" }}>(It won't be uploaded)</p> */}
            </p>
          </Fade>
        )}
        {privateKey && username.length > 5 && (
          <Fade in={true}>
            <p style={subHeading}>You can click on Enter to safely Login </p>
          </Fade>
        )}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // height: "500px",
        }}
      >
        <Card
          // className={classes.root}
          style={{
            background: "#fff",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>SigIn</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id="filled-basic"
              label="username"
              variant="filled"
              style={{
                width: 340,
                marginTop: "2rem",
                marginBottom: "2rem",
                marginRight: "1rem",
                marginLeft: "1rem",
              }}
            />
            {username.length <= 5 && <div style={{ width: 24 }} />}
            {username.length > 5 && <Checkmark />}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleClick}
              style={{
                width: 340,
                height: 40,
                background: "#6163AB",
                color: " white",
                marginRight: "1rem",
                marginLeft: "1rem",
              }}
            >
              Add Private Key
            </Button>
            {privateKey.length == 0 && <div style={{ width: 24 }} />}
            {privateKey && <Checkmark />}
          </div>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />

          <Button
            disabled={privateKey ? false : true}
            style={{
              width: 342,
              height: 40,
              background: "#6163AB",
              color: " white",
              marginTop: "2rem",
              marginBottom: "1.5rem",
              marginRight: "2.5rem",
              marginLeft: "1rem",
            }}
            onClick={Signin}
          >
            Enter
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Login;
