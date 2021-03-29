import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import loadWeb3 from "../../Web3/LoadWeb3";
import ContractConnect from "../../Web3/ContractConnect";
import EncrptPublicKey from "./../../Cryptography/Encryption";
import DecryptPrivateKey from "./../../Cryptography/Decryption";
import StringUpload from "./../../Ipfs/StringUpload";
import StringRetrive from "./../../Ipfs/StringRetrive";
import CircularProgress from "@material-ui/core/CircularProgress";
const NodeRSA = require("node-rsa");

const SignUp = () => {
  const [username, setUsername] = React.useState("");
  const [pubKey, setPubKey] = React.useState("");
  const [privateKey, setPrivate] = React.useState("");
  const [contract, setContract] = React.useState("");
  const [error, setError] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  React.useEffect(async () => {
    await loadWeb3();
    console.log("Web3 Loaded");
    const Contract = await ContractConnect();
    setContract(Contract);
    // await generateKeyPair(); //This will make the site slow
  }, []);

  const generateKeyPair = async () => {
    if (username) {
      setLoader(true);
      setError(false);
      setPrivate(false);
      setPubKey(false);
      const key = new NodeRSA({ b: 512 });
      const public_key = key.exportKey("public");
      const private_key = key.exportKey("private");
      setPrivate(private_key);
      setPubKey(public_key);
      const encrypted_text = await EncrptPublicKey(username, public_key);

      const hash = await StringUpload(encrypted_text);
      const encrypted_retrived_string = await StringRetrive(hash);
      const decrypted_text = await DecryptPrivateKey(
        encrypted_retrived_string,
        private_key
      );
      console.log(decrypted_text === username);
   
    } else {
      setLoader(false);
      setError("Enter a valid username");
    }
  };

  // const EncryptData=()=>{
  //   if()
  //   const userEncryption = await EncrptPublicKey(username, pubKey)
  // }

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
        {!pubKey && !privateKey && loader && <CircularProgress />}
        {pubKey && (
          <h3>
            Public Key
            <br />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              value={pubKey}
            >
              <span style={{ color: "red" }}>{pubKey}</span>
            </TextField>
          </h3>
        )}
        <br />
        <br />
        {privateKey && (
          <h3>
            Private Key
            <br />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              value={privateKey}
            >
              <span style={{ color: "red" }}>{privateKey}</span>
            </TextField>
          </h3>
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
      </Grid>
    </Grid>
  );
};
export default SignUp;
