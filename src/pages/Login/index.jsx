import React from "react";
import { TextField, Button, Card, makeStyles, Fade } from "@material-ui/core";
import {
  GetPassHash,
  GetPublic,
  loadWeb3,
  ContractConnect,
  CheckUser,
} from "../../Web3/";
import { StringRetrive } from "../../Ipfs";
import { DefaultDecryptPrivateKey } from "../../cryptography";
import { Redirect, Link } from "react-router-dom";
import * as ROUTES from "./../../constants/routes";
import { Checkmark } from "../../components/checkmark/checkmark";
import Validator from "./../../utility/validator";
const Login = () => {
  // setting empty states for variables
  const [username, setUsername] = React.useState("");
  const [privateKey, setPrivateKey] = React.useState("");
  const [contract, setContract] = React.useState("");
  const [publicHash, setPublicHash] = React.useState("");
  const [keyFile, setKeyFile] = React.useState("");

  const hiddenFileInput = React.useRef(null);
  // handling the button for private key file upload
  const handleClick = (_event) => {
    hiddenFileInput.current.click();
  };
  // handling change in the file upload of privatekey
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    const fileext=fileUploaded.name.split('.').reverse()[0]
    if(!(fileext==='pem')){
      window.alert("The private key uploaded should have an extention with .pem");
      return;
    }
    console.log(fileUploaded);
    setKeyFile(fileUploaded);
    readkeyFile(fileUploaded);
  };
  // fucntion to read the private file
  function readkeyFile(file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      setPrivateKey(evt.target.result);
    };
    reader.onerror = () => console.log("error");
  }
  // preloaded script to load the web3 and connect with contract
  React.useEffect(() => {
    async function setup() {
      await loadWeb3();
      const Contract = await ContractConnect();
      setContract(Contract);
    }
    setup();
  }, []);
  // get the public hash and set it in the local storage
  React.useEffect(() => {
    if (publicHash) {
      const json = JSON.stringify(publicHash);
      localStorage.setItem("public_hash", json);
    }
  }, [publicHash]);
  // get the public username and set it in the local storage
  React.useEffect(() => {
    if (username) {
      const json = JSON.stringify(username);
      localStorage.setItem("user_name", json);
    }
  }, [username]);

  const buttonInlineStyle = {
    paddingTop: "3em",
  };

  // Function to handle the signin
  const Signin = async () => {
    // if the username and private key are present then this will handle else it will throw an error
    if (username && privateKey) {
      const userexist = await CheckUser(contract, username);
      if (!userexist) {
        window.alert(
          "Username not Found ! Kindly Check the Username you entered"
        );
        return;
      }
      try{
      // getting the public hash for the username
      const public_hash = await GetPublic(contract, username);
      // getting the passhash  from the smart contract
      const pass_hash = await GetPassHash(contract, username);
      // getting the public key from the hash
      const public_key = await StringRetrive(public_hash);
      // getting encrpyted text from the ipfs
      const encrypted_pass = await StringRetrive(pass_hash);
      // decrypt the encrpyted pass from private key
      const decrypted_pass = await DefaultDecryptPrivateKey(
        encrypted_pass,
        privateKey
      );
      // if it matches with the username then we can set the public hash
      if (decrypted_pass === username)
      {
        setPublicHash(public_hash);
      }
      }
      catch(error){
        window.alert(
          "The provided private Key is incorrect! Please add correct private key"
        );
        return;
      }
      
    }
  };
  // Styling CSS Variables
  const heading = {
    alignSelf: "flex-end",
    fontSize: "26px",
    color: "#fff",
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
  // if token and login user name is present then return to dashboard
  if (token && LoginUser) {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }
  // If the public hash is not empty then routes to dash board
  if (publicHash !== "") {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }
  return (
    <Fade in={true} timeout={1200}>
      <div style={{ display: "flex" }}>
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
          
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>SignIn</p>
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
                helperText="Enter your Username"
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
          {/* <div style={{ flexGrow: 1 }} /> */}
          <div style={{ paddingTop: "2rem" }}>
            <p>
              Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </p>
          </div>
        </div>

        <div
          style={{
            background:
              "url(https://raw.githubusercontent.com/imabp/wallpapers/21795f89e0237a2043c1cc8cf0683d471d8d6af5/collection/eaerth.svg)",

            flex: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div style={{background:"black", opacity:"0.7", height:'100%', width:'100%'}}>
          </div>
          <h2 style={{margin:'36px', zIndex:'5',position:'fixed'}} >
            Sign in to your account to upload, access or share your files securely in  the blockchain way.
          </h2>
         
          {username.length > 5 && (
            <Fade in={true}>
              <p style={subHeading}>
                Please add your Private Key, this won't leave your browser
              </p>
            </Fade>
          )}
          {privateKey && username.length > 5 && (
            <Fade in={true}>
              <p style={subHeading}>You can click on Enter to saftely Login </p>
            </Fade>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default Login;
