import React from "react";
import { TextField, Button } from "@material-ui/core";
import GetPassHash from "../../Web3/GetPassHash";
import GetPublic from "../../Web3/GetPublicHash";
import loadWeb3 from "../../Web3/LoadWeb3";
import StringRetrive from "../../Ipfs/StringRetrive";
import ContractConnect from "../../Web3/ContractConnect";
import DefaultDecryptPrivateKey from "../../cryptography/Decryption";
import { Grid } from "@material-ui/core";
const Login = (props) => {
  const [username, setUsername] = React.useState("");
  const [privateKey, setPrivateKey] = React.useState("");
  const [contract, setContract] = React.useState("");

  React.useEffect(() => {
    async function setup() {
      await loadWeb3();
      console.log("Web3 Loaded");
      const Contract = await ContractConnect();
      setContract(Contract);
    }
    setup();
    const json = JSON.stringify(privateKey);
    sessionStorage.setItem("token", json);
  }, [privateKey]);

  const buttonInlineStyle = {
    paddingTop: "3em",
  };

  const Signin=async()=>{
    if (username && privateKey) {
        const public_hash= await GetPublic(contract,username);
        const pass_hash= await GetPassHash(contract,username);
        const public_key = await StringRetrive(public_hash);
        console.log(public_key);
        const encrypted_pass= await StringRetrive(pass_hash);
        console.log(encrypted_pass);
        const decrypted_pass = await DefaultDecryptPrivateKey(encrypted_pass,privateKey);
        console.log(decrypted_pass);
        console.log(decrypted_pass==username);

    } else {
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={10} md={6} lg={6} style={{ paddingLeft: "20em" }}>
        <br />
        <b>Please enter your user id</b>
        <br />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <TextField
          fullWidth
          label="Enter your user id"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <TextField
          fullWidth
          label="Enter public key"
          value={privateKey}
          onChange={(e) => {
            setPrivateKey(e.target.value);
          }}
        />

        <div style={buttonInlineStyle}>
          <Button
            style={{
              borderRadius: 25,
              backgroundColor: "#2b3b4e",
              color: "white",
            }}
            onClick={Signin}
          >
            Enter
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
