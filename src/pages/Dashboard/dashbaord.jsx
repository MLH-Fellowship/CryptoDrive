import React, { useState, useCallback } from "react";
import { StringUpload } from "../../Ipfs";
import { EncrptPublicKeyFile } from "../../cryptography";
import { AddFile, ContractConnect, loadWeb3 } from "../../Web3";
import { StringRetrive } from "../../Ipfs";
import FileBar from "../../components/FileBar";
import {
  Button,
  Grid,
  Snackbar,
  Backdrop,
  Card,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import { FileDrop } from "react-file-drop";
import Validator from "./../../utility/validator";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
// This page defines the upload files components in the dashboard route
const DashBoard = (_props) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [bufferState, setBufferState] = useState([]);
  const [contract, setContract] = React.useState("");
  const [hash, setHash] = useState([]);
  const [passHash, setPassHash] = useState("");
  const [filename, setfilename] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showSnackBar, setSnackbar] = useState(false);
  var jsscompress = require("js-string-compression");

  const classes = useStyles();
  // useeffect used to load the web3 and connect the contract
  React.useEffect(() => {
    async function setup() {
      await loadWeb3();
      const Contract = await ContractConnect();
      setContract(Contract);
    }
    setup();
  }, []);
  // Function to get the file buffer from the drag and drop
  const captureFile = (files, event) => {
    // check for no file added or an empty file

      setLoader(true);
      setMessage("Encrypting  your File");
      event.stopPropagation();
      event.preventDefault();
      const file = files[0];
      setfilename(file.name);
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => convertToBuffer(reader);
      setLoader(false);
      setMessage("Encryption Successful. Click Upload");
  };

  // Function to convert the file object to the Array Buffer and setting it to state
  const convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    setBufferState(buffer);
  };

  // Function which is triggered when the user clicked on the upload button
  const onSubmit = async (event) => {
    try{
    event.preventDefault();
    setLoader(true);
    setMessage("Preparing to Upload to Blockchain");
    // check for no file added or an empty file
    if (uploadFiles.length > 0 && uploadFiles[0].size === 0) {
      setLoader(false);
      return window.alert(
        "The file you tried to upload is empty. Please check the file and try again."
      );
    } else {
    event.stopPropagation();
    //save document to IPFS,return its hash#, and set hash# to state
    const publicHASH = await Validator("publicHash");
    // Get the public key from the public hash stored in the local storage
    const publicKey = await StringRetrive(publicHASH);
    // Buffer of the file is encrypted with the public key
    const buffer_encrypted = await EncrptPublicKeyFile(bufferState, publicKey);
    setMessage("Converted to Buffer. Uploading to Blockchain! ");
    // We used the Huffmann Compression to compress the encrpyted string
    var hm = new jsscompress.Hauffman();
    var compressed = hm.compress(buffer_encrypted);
    // Upload the compressed string to IPFS as a string and return the Hash
    const hash = await StringUpload(compressed);
    setHash(hash);
    const username = Validator("username");
    try{
    // Add the file name and dile hash retrived from the ipfs will be sent to the smart contract 
    setMessage("Upload Request Sent to Blockchain");
    const result = await AddFile(contract, username, hash, filename);
    // If the file is successfully uploaded to blockchain, notify it to user
    if (result.status === true) {
      setMessage("Uploaded to Blockchain.");
      setUploadFiles([]);
      setLoader(false);
      setSnackbar(true);
    }
    // If the file failed to upload, notify the message to user
    else {
      setMessage("Upload failed, Please Try again");
      setLoader(false);
    }
    }
    catch(error){
      setLoader(false);

    }
  }
    }
    catch(error){
      setLoader(false);
      window.alert(
        "The provided private Key is incorrect! Please add correct private key"
      );
      return;
    }
  
  };
  // get ipfs publicHash, if already logged in
  const token = Validator("publicHash");
  // if user is logged in, get its username
  const loginUser = Validator("username");
  // if anyone of them do not exist, redirect to signin page.
  if (!token || !loginUser) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }
  //setting up styles for the upload to my files section
  const styles = {
    border: "2px solid #6163FF",
    color: "#6163FF",
    padding: "20px",
    marginBottom: "10px",
    width: "100%",
    transition: "ease 2s all",
    // height: "45vh",
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {" "}
          <h3> Choose file to send to IPFS </h3>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={styles}>
            <FileDrop
              onDragOver={(event) => {
                event.currentTarget.style.color = "#ECEDED";
                event.currentTarget.style.opacity = "0.8";
                event.currentTarget.style.transition = "ease 1s all";
                event.currentTarget.style.border = "2px dashed #6163FF";
              }}
              onDragLeave={(event) => {
                event.currentTarget.style.background = "";
                event.currentTarget.style.color = "";
                event.currentTarget.style.opacity = "";
                event.currentTarget.style.border = "";
              }}
              onDrop={(files, event) => {
                captureFile(files, event);
                setUploadFiles(files);
                // having trouble with this line. uploadFiles.length always === 0 at this point
                if (uploadFiles.length > 0 && uploadFiles[0].size === 0) {
                  return window.alert(
                    "The file you tried to upload is empty. Please check the file and try again." + uploadFiles[0].size
                  );
                } else {
                  
                  event.currentTarget.style.background = "yellowgreen";
                  event.currentTarget.style.color = "black";
                  event.currentTarget.style.opacity = "";
                  event.currentTarget.style.border = "";
                  event.currentTarget.style.padding = "25px";
                }
              }}
            >
              Drop a file here!
              <hr />
              <div style={{ height: "30vh" }}>
                {uploadFiles.length > 0 && (
                  <FileBar
                    filename={uploadFiles[0].name}
                    filesize={uploadFiles[0].size}
                  />
                )}
              </div>
            </FileDrop>
          </div>

          <Button
            style={{ background: "#6163FF", color: "#ECEDED" }}
            type="submit"
            onClick={onSubmit}
          >
            Upload
          </Button>
        </Grid>
        <Grid></Grid>
      </Grid>
      <br />
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
      {showSnackBar && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          ContentProps={{
            style: { background: "#6163FF", width: "200px", padding: "20px" },
          }}
          onClose={() => setSnackbar(false)}
          onExit={() => setSnackbar(false)}
          open={true}
          autoHideDuration={3000}
          action={
            <div style={{ background: "#6163FF" }}>
              Upload Successful, head over to MyFiles to see the uploaded files
            </div>
          }
        />
      )}
    </>
  );
};

export default DashBoard;
