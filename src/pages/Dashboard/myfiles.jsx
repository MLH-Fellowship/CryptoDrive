import React from "react";
import FileHolder from "./../../components/myfileHolder";
import {
  loadWeb3,
  ContractConnect,
  GetFileHash,
  GetPublic,
  AddShareFile,
  CheckUser
} from "../../Web3/";
import { FileRetrive, StringRetrive, StringUpload } from "../../Ipfs";
import Validator from "./../../utility/validator";
import { Redirect } from "react-router-dom";
import * as ROUTES from "./../../constants/routes";
import Checkbox from "@material-ui/core/Checkbox";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import {
  Button,
  Grid,
  Snackbar,
  Backdrop,
  Card,
  CircularProgress,
} from "@material-ui/core";
import AlertDialogSlide from "../../components/alert_dailog_slide";
import { Checkmark } from "../../components/checkmark/checkmark";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import _ from "lodash";
import FileSaver from "file-saver";
import mime from "mime-types";
import {
  EncrptPublicKey,
  EncrptPrivateKeyFile,
  DefaultDecryptPrivateKeyFile,
} from "../../cryptography";
import TextField from "@material-ui/core/TextField";
import { Loader } from "rsuite";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const MyFiles = ({ privateKey, setPrivateKey }) => {
  const [myFiles, setMyFiles] = React.useState([]); // Use this when you set up the IPFS thing.
  const [contract, setContract] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [checked_index, setindex] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [checkedstyle, setCheckedStyle] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [keyFile, setKeyFile] = React.useState();
  const [receiverName, setReceiverName] = React.useState();
  const [nameDialog, setUnameDialog] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [entry, setEntry] = React.useState(0);
  const [showSnackBar, setSnackbar] = React.useState(false);

  const classes = useStyles();
  // function to retrieve the username from the local storage
  function getUserName() {
    const tokenString = localStorage.getItem("user_name");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken;
    } else {
      return false;
    }
  }

  // preloaded script to load the contract and initialise the web3
  React.useEffect(() => {
    async function setup() {
      await loadWeb3();
      const Contract = await ContractConnect();
      setContract(Contract);
    }
    setup();
  }, []);
  // function used to handle the change in the check box when there is any change this fucntion will be executed
  const handleChange = (index) => {
    // creating a dummy array equal to checked and changed the particular index to not of the current index value to show the change
    const check_dummy = checked;
    let selectionStyle = { background: "orange", opacity: "0.7" };
    check_dummy[index] = !check_dummy[index];
    // Set the state of checked with the dummy index
    setChecked(check_dummy);
    // if the checked index value is true then we will push the particular index in the dummy and set the final state of index array
    if (checked[index]) {
      const checked_index_dummmy = checked_index;
      checked_index_dummmy.push(index);
      setindex(checked_index_dummmy);
      setCheckedStyle(selectionStyle);
    }
    // if the checked index value is false then that means the checkbox is unchecked then we need to remove the particular ndex from the array
    // once the array is final it will be in the set state
    if (!checked[index]) {
      const checked_index_dummmy = checked_index;
      const i = checked_index_dummmy.indexOf(index);
      if (i !== -1) {
        checked_index_dummmy.splice(i, 1);
      }
      setindex(checked_index_dummmy);
      setCheckedStyle({});
    }
  };
  // function used for geting the my files list from web3
  async function setupMyFiles() {
    // getting the username from the local storage
    const user = getUserName();
    // setting the state of the username with value of user
    setUsername(user);
    // if the username and contract are set with the value then this block will be executed
    if (contract && username) {
      // getting the file hashes json array from the smart contract passing the contract and username
      const filehashes = await GetFileHash(contract, username);
      // if the file hashes is not an empty array then we will set it to state
      if (filehashes) {
        setMyFiles(filehashes);
        // setting the false value to the array with the length of the filehashes
        setChecked(Array(myFiles.length).fill(false));
      }
    }
  }
  // This function is used to read the file for setting the private key value in the state from the select file
  function readkeyFile(file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      // setting the private key state with the private key text in the file
      setPrivateKey(evt.target.result);
    };
    // If it found error it prints the error in the console.log
    reader.onerror = () => console.log("error");
  }
  // Function for handling the download files
  async function handleDownloadFiles() {
    // if the private eky is initialised and any atleast one item in checked then this block will be executed
    if (privateKey && checked_index.length >= 0) {
      try{
      // we will start the loader
      setLoader(true);
      // setting the status of the action
      setMessage(
        "We are de-compressing the file. It may take a while, please click on wait if prompted in your browser."
      );
      // looping the checked index and performing the whole download logic here
      checked_index.map(async (value, j) => {
        // getting the file name from myfiles retrived from the smart contract
        const file_n = myFiles[checked_index[j]].filename;
        // getting the filehash from the myfiles retrived from the smart contract
        const file_h = myFiles[checked_index[j]].filehash;
        // getting the encrypted file from the filehash from ipfs
        const encryted_file = await FileRetrive(file_h);
        // using js string compression library and huffman algorithm
        var jsscompress = require("js-string-compression");
        var hm = new jsscompress.Hauffman();
        try{
        // decrypted the encrypted file with private key of the user and before that we need to decompress the encrypted file
        const decr = await DefaultDecryptPrivateKeyFile(
          await hm.decompress(encryted_file),
          privateKey
        );
        // Getting the content type of the file
        const type = mime.lookup(file_n);
        // Converting the file buffer to blob
        var blob = new Blob([decr], {
          type: type,
        });
        // using the file saver library to download the blob
        FileSaver.saveAs(blob, file_n);
        // setting the status message for successful downlaod
        setMessage("Decompression Successful. Please Check Browser Downloads");
        setLoader(false);
        setSnackbar(true);}
        catch(error){
          setLoader(false);
          setKeyFile(false);
          setPrivateKey(false);
          window.alert(
            "The provided private Key is incorrect! Please add correct private key"
          );
          return;
        }
      });
    }
    catch(error){
      setLoader(false);
      setKeyFile(false);
      setPrivateKey(false);
      window.alert(
        "The provided private Key is incorrect! Please add correct private key"
      );
      return;
    }
  }
}
  // function used for handling the shared files
  async function handleShareFiles() {
    // if the private key is initialised and any atleast one item in checked then this block will be executed
    if (privateKey && checked_index.length >= 0 && receiverName) {
      // Edge Case:-
      // If the sender and receiver is same then
      if(username===receiverName){
        window.alert(
          "Sender and Receiver can't be same. Please try again"
        );
        return;
      }
      // If the receiver name doesn't exist
      try{
      const userExist=await CheckUser(contract,receiverName);
      if(!userExist){
        window.alert("Receiver Username Doesn't Exist! Please try again");
        return;
      }
      // we will start the loader
      setLoader(true);
      // setting the status of the action
      setMessage(
        `We are sharing the file with ${receiverName}. The Browser may prompt with a option of wait, please click on wait.`
      );
      // Creating a empty array
      var hashfile_share_array = [];
      // Looping the checked index
      checked_index.map(async (value, j) => {
        // getting the file name from myfiles retrived from the smart contract
        const file_n = myFiles[checked_index[j]].filename;
        // getting the filehash from the myfiles retrived from the smart contract
        const file_h = myFiles[checked_index[j]].filehash;
        // getting the encrypted file from the hash of ipfs
        const encryted_file = await FileRetrive(file_h);
        // using the js string compression library and huffman algorithm
        var jsscompress = require("js-string-compression");
        var hm = new jsscompress.Hauffman();
        try{
        // Decompressing the encrpted file and decrypt with the private key
        const decr = await DefaultDecryptPrivateKeyFile(
          await hm.decompress(encryted_file),
          privateKey
        );
        // get the reciver name
        const receiver = receiverName;
        // getting the public key hash of the reciver from the smart contract
        const public_receiver = await GetPublic(contract, receiver);
        // getting the public key from the hash from ipfs
        const public_key_receiver = await StringRetrive(public_receiver);
        // encrpyting the file with the sender private key
        const encrypted_sender = await EncrptPrivateKeyFile(decr, privateKey);
        // encrypting the file with the receiver public key
        const encrypted_receiver = await EncrptPublicKey(
          encrypted_sender,
          public_key_receiver
        );
        // sending the encrpyted string to ipfs for string upload
        const encrypted_receiver_sender_hash = await StringUpload(
          encrypted_receiver
        );
        // storing the file upload meta data in a json
        const fileshare = {
          filehash: encrypted_receiver_sender_hash,
          filename: file_n,
          sender: username,
        };
        hashfile_share_array.push(fileshare);
        if (j === checked_index.length - 1) {
          try{
          // if the index of check array is last then we will send th json array to smart contract where we can save the details
          const result = await AddShareFile(
            contract,
            receiver,
            hashfile_share_array
          );
          if (result.status) {
            setLoader(false);
            setMessage(`File shared with, ${receiverName}`);
            setSnackbar(true);
          } else {
            setLoader(false);
            setMessage(
              `Unable to share the file with ${receiverName}. Please try again. Make sure, you are entering correct username.`
            );
          }
        }
        catch(error){
          setLoader(false);
          window.alert(
            "Upload failed due to rejection in transaction from smart contract"
          );
          return;
        }
      }
    }
    catch(error){
      setLoader(false);
      setKeyFile(false);
      setPrivateKey(false);
      
      window.alert(
        "The provided private Key is incorrect! Please add correct private key"
      );
      return;
    }
      });
    }
    catch(error){
      setLoader(false);
      setKeyFile(false);
      setPrivateKey(false);
    
      window.alert(
        "The provided private Key is may be incorrect! Please add correct private key"
      );
     
      return;

    }
  }
}

  // Preload script to get the my files from smart contract
  React.useEffect(() => {
    setupMyFiles();
  }, [contract]);

  const token = Validator("publicHash");
  const loginuser = Validator("username");
  if (!token || !loginuser) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }

  const styles = {
    border: "1px solid black",
    width: 900,
    color: "black",
    padding: 20,
  };
  return (
    <>
      <AlertDialogSlide
        title={"Enter a username to share"}
        subtitle={"Please make sure the username is valid "}
        open={nameDialog}
        handleClose={async (e) => {
          setUnameDialog(false);
          if (receiverName) await handleShareFiles();
        }}
      >
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="UserName"
            variant="outlined"
            onChange={async (e) => {
              setReceiverName(e.target.value);
            }}
            onKeyPress={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setUnameDialog(false);
                if (receiverName) await handleShareFiles();
              }
            }}
          />
        </form>
      </AlertDialogSlide>
      <AlertDialogSlide
        title={" Add your private key to conitnue to download or share"}
        subtitle={"Your private key will not leave your browser"}
        open={modalVisible}
        handleClose={async () => {
          setModalVisible(false);
          if (entry === 0) await handleDownloadFiles();
        }}
        style={{ background: "#6163FF", color: "#ECEDED" }}
      >
        <br />
        <Grid container>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <input
              type="file"
              id="fileupload"
              style={{ display: "none" }}
              onChange={(event) => {
                const fileUploaded=event.target.files[0]
                const fileext=fileUploaded.name.split('.').reverse()[0]
                if(!(fileext==='pem')){
                  window.alert("The private key uploaded should have an extention with .pem");
                  return;
                }
                setKeyFile(fileUploaded);
                readkeyFile(fileUploaded);
              }}
            />
            <label
              htmlFor="fileupload"
              style={{
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 10,
                paddingBottom: 10,
                width: "150px",
                borderRadius: 25,
                backgroundColor: "#2b3b4e",
                color: "white",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Add Private Key
            </label>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            {keyFile && (
              <div
                style={{
                  paddingTop: "15px",
                  paddingLeft: "30px",
                }}
              >
                <Checkmark size="medium" />
              </div>
            )}
          </Grid>
        </Grid>
        <div
          style={{
            paddingTop: "3em",
            display: "flex",
          }}
        ></div>
      </AlertDialogSlide>{" "}
      <Grid container>
        <Grid container item xs={12} sm={12} md={6} lg={6}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h2 style={{ margin: "0px" }}>My Files</h2>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            {privateKey && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <VpnKeyIcon /> &nbsp;&nbsp;&nbsp;<b>Private Key Initialized</b>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ position: "fixed", zIndex: 5 }}>
            <Button
              style={{
                marginLeft: "10px",
                borderRadius: 25,
                backgroundColor: "#6163FF",
                color: "white",
              }}
              onClick={async () => {
                setEntry(0);
                if (checked_index.length <= 0) {
                  window.alert("please select a file before downloading");
                  return;
                }
                if (!privateKey) setModalVisible(true);
                await handleDownloadFiles();
              }}
            >
              <CloudDownloadIcon />
            </Button>
            <Button
              style={{
                marginLeft: "10px",
                borderRadius: 25,
                backgroundColor: "#6163FF",
                color: "#ECEDED",
                transition: "ease 0.7s all",
              }}
              onClick={async () => {
                setEntry(1);
                if (checked_index.length <= 0) {
                  window.alert("please select a file before sharing");
                  return;
                }
                if (!privateKey) {
                  setModalVisible(true);
                }
                setUnameDialog(true);
              }}
            >
              <ScreenShareIcon />
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              height: "100px",
              transition: "all 1s ease",
            }}
          >
            <center>
              <br />
              {Loader && (
                <Backdrop
                  className={classes.backdrop}
                  open={loader}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Card
                    style={{
                      width: "25rem",
                      height: "12rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress color="#fff" />
                    <p style={{ marginTop: "2rem" }}>{message}</p>
                  </Card>
                </Backdrop>
              )}
            </center>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <span
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <span style={{ color: "#6163FF" }}>
              <b>Filename</b>
            </span>
            <span style={{ color: "#6163FF" }}>
              <b>FileHash</b>
            </span>
          </span>
          <hr />
        </Grid>
        <Grid container item xs={12} sm={12} md={12} lg={12}>
          {myFiles &&
            myFiles.map((file, index) => (
              <Grid container>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <Checkbox
                    checked={checked[index]}
                    onChange={() => handleChange(index)}
                    name="checkedB"
                    style={{ color: "#ECEDED" }}
                  />
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                  <FileHolder name={file.filename} hash={file.filehash} />
                </Grid>
              </Grid>
            ))}
          {myFiles === [] && (
            <>
              <center>
                <h3>
                  No Files yet by{" "}
                  <span>
                    {Validator("username")}.
                    <br />
                    Go to Upload to create a file.
                  </span>
                </h3>
              </center>
            </>
          )}
        </Grid>
        {showSnackBar && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            ContentProps={{
              style: {
                background: "#6163FF",
                width: "200px",
                padding: "20px",
              },
            }}
            open={true}
            autoHideDuration={3000}
            action={<div style={{ background: "#6163FF" }}>{message}</div>}
          />
        )}
      </Grid>
      <br />
    </>
  );
};
export default MyFiles;
