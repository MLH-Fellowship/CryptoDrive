import React from "react";
import {
  TextField,
  Button,
  Fade,
  Card,
  Backdrop,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loadWeb3, ContractConnect, signup,CheckUser } from "../../Web3";
import { EncrptPublicKey } from "../../cryptography";
import { StringUpload } from "./../../Ipfs";
import * as ROUTES from "./../../constants/routes";
import { Redirect, Link } from "react-router-dom";
import { SaveFile } from "../../components";
import Validator from "./../../utility/validator";
import { Checkmark } from "../../components/checkmark/checkmark";
import { Alert , Notification, } from "rsuite";
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
  const [status,SetStatus]=React.useState("Begin");




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
      // Check the username exist or not
      const userexist=await CheckUser(contract,username);
      console.log(userexist)
      if(userexist){
        window.alert("User Already Exist!")
        return;
      }
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

      try{
        
      // Encrypt public key and upalod to IPFS and BlockChain
      const encrypted_text = await EncrptPublicKey(username, public_key);
      const hash = await StringUpload(encrypted_text);
      const public_hash = await StringUpload(public_key);

      // Upload user detials to block chain
      const result = await signup(contract, username, hash, public_hash);

      if (result) {
      setLoader(false);
      // set keys to state to obtain for downloading
      setPrivate(private_key);
      setPubKey(public_key);
      }

      setHash(hash);
      SetPublicHash(public_hash);
      }
      catch(error){
        setLoader(false);
        window.alert(
          "Signup failed due to rejection in transaction from smart contract! Please try again and confirm metamask"
        );
        return;
      }
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

  return (// // // // // // // // // // // // // // // // // // // // 
    <Fade in={true} timeout={1200}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            background: "url(https://raw.githubusercontent.com/imabp/wallpapers/main/collection/CachedImage_1920_1080_POS2.jpg) no-repeat ",
            backgroundSize:'cover',
            flex: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <h2 style={{marginTop:'25px', marginLeft:'25px',}}>
           A place where you OWN, your OWN data.<br/><br/>
           {/* <span style={{background:'#EDEDED',opacity:'0.8', color:'#6163FF'}}> Help us making this place a better and safer place for everyone.</span> */}
          </h2>
          {/* <h5>
            CryptoDrive is one of the fastest growing <br/>
            <span style={{background:'#6163FF', color:'#EDEDED'}}><u>Decentralized</u> File Storage and Sharing Solutions.</span>
          </h5> */}
          {/* {username.length > 5 && (
            <Fade in={true}>
              <p style={subHeading}>
                Please wait while we generate your keys. You'll be notified
                soon.
              </p>
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
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>SignUp</p>
            <img src="https://raw.githubusercontent.com/MLH-Fellowship/CryptoDrive/staging/docs/assets/cd.png?token=AMYAVDGLQBOZ4HMS5SC4PC3APBWQ4" height="70" width="120"/>
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
                label="Username"
                helperText="Atleast 6 Characters long"
                variant="filled"
                style={{
                  width: 340,
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  marginRight: "1rem",
                  marginLeft: "1rem",
                }}
              />
               {username.length <= 5 && <div style={{width:24}} />}
               {username.length > 5 && <Checkmark />}
            </div>

         

            <br/> 
            <Button
              disabled={username.length > 5 ? false : true}
              style={{
                width: 345,
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
         { privateKey && pubKey &&  <Fade in={true} timeout={1200}><Card
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
          </Card></Fade>}
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
