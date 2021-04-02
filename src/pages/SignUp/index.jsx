import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import loadWeb3 from "../../Web3/LoadWeb3";
import ContractConnect from "../../Web3/ContractConnect";
import signup from "../../Web3/SignUp";
import GetPublic from "../../Web3/GetPublicHash";
import GetPassHash from "../../Web3/GetPassHash";
import EncrptPublicKey from "../../cryptography/Encryption";
import DecryptPrivateKey from "../../cryptography/Decryption";
import StringUpload from "./../../Ipfs/StringUpload";
import StringRetrive from "./../../Ipfs/StringRetrive";
import CircularProgress from "./../../components/loader";
import * as ROUTES from "./../../constants/routes";
import { Redirect } from "react-router-dom";
import { SaveFile } from "../../components";
import { flexbox } from "@material-ui/system";
import Validator from './../../utility/validator'
const NodeRSA = require("node-rsa");

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

  // const EncryptData=()=>{
  //   if()
  //   const userEncryption = await EncrptPublicKey(username, pubKey)
    // }

  const token = Validator('publicHash')
  const loginUser = Validator('username')
  if (token && loginUser) {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <br />
        <b>
          You will be recieving a Private Key, which you need to keep it safe,
          in order to access the files.
        </b>
        <br />
        <br />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <TextField
          fullWidth
          label="Enter A Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <Button
          variant="outlined"
          style={{ backgroundColor: "#2B3B4E", color: "#F4A200" }}
          onClick={generateKeyPair}
        >
          Sign Up
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {loader && (
          <>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <center>
                  <CircularProgress />
                  <br />
                  Please Confirm the Metamask Transaction.
                  <br />
                  You are not going to be charged. Once you confirm, you may
                  need to wait for a while.
                  <br />
                  After that, we will be showing you your private and public key
                </center>
              </Grid>
            </Grid>
          </>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {pubKey && hash && publichash && (
            <Button
              style={{
                width: "200px",
                paddingLeft: "5px",
                paddingRight: "5px",
                borderRadius: 25,
                backgroundColor: "#2b3b4e",
                color: "white",
              }}
              href="/signup"
            >
              <SaveFile
                text={pubKey}
                fileName={"publickey"}
                buttonText={"Get Public Key"}
              ></SaveFile>
            </Button>
          )}
          <br />
          <br />
          {privateKey && hash && publichash && (
            <Button
              style={{
                width: "200px",
                paddingLeft: "5px",
                paddingRight: "5px",
                borderRadius: 25,
                backgroundColor: "#2b3b4e",
                color: "white",
              }}
            >
              <SaveFile
                text={privateKey}
                fileName={"privateKey"}
                buttonText={"Get Private Key"}
              ></SaveFile>
            </Button>
          )}
          <br />
          <br />
          {error && (
            <span style={{ color: "red" }}>
              <center>
                <h2>{error}</h2>
              </center>
            </span>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
export default SignUp;
