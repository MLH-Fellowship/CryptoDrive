import React, { useState, useCallback } from "react";
import { StringUpload } from "../../Ipfs";
import { EncrptPublicKeyFile } from "../../cryptography";
import { AddFile, ContractConnect, loadWeb3 } from "../../Web3";
import { StringRetrive } from "../../Ipfs";
import FileBar from "../../components/FileBar";
import { Button, Grid, Snackbar } from "@material-ui/core";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import { FileDrop } from "react-file-drop";
import Validator from "./../../utility/validator";
// This page defines the upload files components in the dashboard route
const DashBoard = (props) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [bufferState, setBufferState] = useState([]);
  const [contract, setContract] = React.useState("");
  const [hash, setHash] = useState([]);
  const [passHash, setPassHash] = useState("");
  const [filename, setfilename] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  var jsscompress = require("js-string-compression");
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
    event.preventDefault();
    setLoader(true);
    setMessage("Preparing to Upload to Blockchain");
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

    // Add the file name and dile hash retrived from the ipfs will be sent to the smart contract
    const result = await AddFile(contract, username, hash, filename);
    setMessage("Upload Request Sent to Blockchain");

    // If the file is successfully uploaded to blockchain, notify it to user
    if (result.status === true) {
      setMessage("Uploaded to Blockchain.");
      setUploadFiles([]);
      setLoader(false);
    }
    // If the file failed to upload, notify the message to user
    else {
      setMessage("Upload failed, Please Try again");
      setLoader(false);
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
                event.currentTarget.style.background = "yellowgreen";
                event.currentTarget.style.color = "black";
                event.currentTarget.style.opacity = "";
                event.currentTarget.style.border = "";
                event.currentTarget.style.padding = "25px";
                captureFile(files, event);
                setUploadFiles(files);
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
      {message && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          ContentProps={{
            style: { background: "#6163FF", width: "200px", padding: "20px" },
          }}
          open={true}
          autoHideDuration={3000}
          action={<div style={{ background: "#6163FF" }}>{message}</div>}
        />
      )}
    </>
  );
};

export default DashBoard;
