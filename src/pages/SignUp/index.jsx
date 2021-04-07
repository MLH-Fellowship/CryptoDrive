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
import { loadWeb3, ContractConnect, signup } from "../../Web3";
import { EncrptPublicKey } from "../../cryptography";
import { StringUpload } from "./../../Ipfs";
import * as ROUTES from "./../../constants/routes";
import { Redirect, Link } from "react-router-dom";
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

  // Intialize web3 and ensure MetMask is installed.
  React.useEffect(() => {
    async function setup() {
      await loadWeb3();
      const Contract = await ContractConnect();
      setContract(Contract);
    }
    setup();
    // await generateKeyPair(); //This will make the site slow
  }, []);

  const classes = useStyles();

  // generate Public and private keys
  const generateKeyPair = async () => {
    if (username) {
      // Set requied states to show loader and other UI elements
      setLoader(true);
      setPubKey(false);
      setError(false);
      setPrivate(false);
      setHash(false);
      SetPublicHash(false);

      // obtain key value from NodeRSA
      const key = new NodeRSA({ b: 512 });
      // export genrated public and private key
      const public_key = key.exportKey("public");
      const private_key = key.exportKey("private");

      // set keys to state to obtain for downloading
      setPrivate(private_key);
      setPubKey(public_key);

      // Encrypt public key and upalod to IPFS and BlockChain
      const encrypted_text = await EncrptPublicKey(username, public_key);
      const hash = await StringUpload(encrypted_text);
      const public_hash = await StringUpload(public_key);

      // Upload user detials to block chain
      const result = await signup(contract, username, hash, public_hash);

      if (result) {
        setLoader(false);
      }

      setHash(hash);
      SetPublicHash(public_hash);
    } else {
      // incase a username already exists
      setLoader(false);
      setError("Enter a valid username");
    }
  };

  // Styles for heading text
  const heading = {
    alignSelf: "flex-end",
    fontSize: "24px",
    color: "#fff",
    marginTop: "5rem",
    marginBottom: "15rem",
    paddingRight: "3rem",
    paddingLeft: "5rem",
  };

  // Styles for sub-heading text
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

  // Validate username and publichash to re-route to dashboard if exists
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
              Have an account? <Link to={ROUTES.SIGN_IN}>
                          Sign in
                        </Link>
            </p>
          </div>
          {error && Alert.error(error)}
        </div>
      </div>
    </Fade>
  );
};
export default SignUp;
