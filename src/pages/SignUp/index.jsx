import React from "react";
import {
  TextField,
  Button,
  Fade,
  Card,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import loadWeb3 from "../../Web3/LoadWeb3";
import ContractConnect from "../../Web3/ContractConnect";
import signup from "../../Web3/SignUp";
import {EncrptPublicKey} from "../../cryptography";
import {StringUpload} from "./../../Ipfs";
import * as ROUTES from "./../../constants/routes";
import { Redirect } from "react-router-dom";
import { SaveFile } from "../../components";
import Validator from "./../../utility/validator";
import { Checkmark } from "../../components/checkmark/checkmark";
import { Alert } from "rsuite";

const NodeRSA = require("node-rsa");

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SignUp = () => {
  const [username, setUsername] = React.useState("");
  const [pubKey, setPubKey] = React.useState(false);
  const [privateKey, setPrivate] = React.useState("");
  const [contract, setContract] = React.useState("");
  const [error, setError] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [hash, setHash] = React.useState("");
  const [publichash, SetPublicHash] = React.useState("");

  React.useEffect(() => {
    async function setup() {
      await loadWeb3();
      console.log("Web3 Loaded");
      const Contract = await ContractConnect();
      setContract(Contract);
    }
    setup();
    // await generateKeyPair(); //This will make the site slow
  }, []);

  const classes = useStyles();

  const generateKeyPair = async () => {
    if (username) {
      setLoader(true);
      setPubKey(false);
      setError(false);
      setPrivate(false);

      setHash(false);
      SetPublicHash(false);
      const key = new NodeRSA({ b: 512 });
      const public_key = key.exportKey("public");
      const private_key = key.exportKey("private");
      setPrivate(private_key);
      setPubKey(public_key);
      const encrypted_text = await EncrptPublicKey(username, public_key);
      const hash = await StringUpload(encrypted_text);
      const public_hash = await StringUpload(public_key);
      console.log(public_hash);
      const result = await signup(contract, username, hash, public_hash);

      // console.log(result);
      // const result1 = await GetPublic(contract,username);
      // console.log(result1);
      // const result2 = await GetPassHash(contract,username);
      // console.log(result2);

      if (result) {
        setLoader(false);
      }

      // console.log(hash)
      // const encrypted_retrived_string = await StringRetrive(hash);
      // const decrypted_text = await DecryptPrivateKey(
      //   encrypted_retrived_string,
      //   private_key
      // );
      // console.log(decrypted_text === username);

      setHash(hash);
      SetPublicHash(public_hash);
    } else {
      setLoader(false);
      setError("Enter a valid username");
    }
  };

  const heading = {
    alignSelf: "flex-end",
    fontSize: "24px",
    color: "#fff",
    marginTop: "5rem",
    marginBottom: "15rem",
    paddingRight: "3rem",
    paddingLeft: "5rem",
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

  const token = Validator("publicHash");
  const loginUser = Validator("username");
  if (token && loginUser) {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }

  return (
    <Fade in={true} timeout={1200}>
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
            Welcom to CryptoDrive, you can create an account to store, access
            and share files securely.
          </h2>
          {username.length > 5 && (
            <Fade in={true}>
              <p style={subHeading}>
                Please wait while we generate your keys. You'll be notified
                soon.
              </p>
            </Fade>
          )}
          {/* {privateKey && username.length > 5 && (
            <Fade in={true}>
              <p style={subHeading}>You can click on Enter to safely Login </p>
            </Fade>
          )} */}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Card
            style={{
              background: "#fff",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>SigUp</p>
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

            <Button
              disabled={username.length > 5 ? false : true}
              style={{
                width: 342,
                height: 40,
                background: "#6163AB",
                color: " white",
                marginBottom: "1.5rem",
                marginRight: "2.5rem",
                marginLeft: "1rem",
              }}
              onClick={generateKeyPair}
            >
              SignUp
            </Button>
          </Card>
          <Backdrop
            className={classes.backdrop}
            open={loader}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CircularProgress color="#fff" />
            <p style={{ marginTop: "2rem" }}>Generating Keys</p>
          </Backdrop>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "30px",
              paddingTop: "10px",
              paddingBottom: "10px",
              marginTop: "2rem",
            }}
          >
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
            >
              <SaveFile
                text={privateKey}
                fileName={"privateKey"}
                buttonText={"Get Private Key"}
              ></SaveFile>
            </Button>
            <Button
              disabled={pubKey ? false : true}
              style={{
                width: 342,
                height: 40,
                background: "#6163AB",
                color: " white",
                marginBottom: "1.5rem",
                marginRight: "2.5rem",
                marginLeft: "1rem",
              }}
            >
              <SaveFile
                text={pubKey}
                fileName={"publickey"}
                buttonText={"Get Public Key"}
              ></SaveFile>
            </Button>
          </Card>
          <div style={{ paddingTop: "2rem" }}>
            <p>
              Have an account? <a href="/signin"> Sign In </a>
            </p>
          </div>
          {error && Alert.error(error)}
        </div>
      </div>
    </Fade>
  );
};
export default SignUp;
