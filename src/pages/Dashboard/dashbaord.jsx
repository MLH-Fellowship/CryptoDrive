import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import StringUpload from "../../Ipfs/StringUpload";
import ipfs from "../../Ipfs/ipfs";
// import styles from "./index.module.css";
import EncrptPublicKeyFile from "../../cryptography/EncryptionFile";
import GetPassHash from "../../Web3/GetPassHash";
import GetPublic from "../../Web3/GetPublicHash";
import AddFile from "../../Web3/AddFileHash";
import loadWeb3 from "../../Web3/LoadWeb3";
import ContractConnect from "../../Web3/ContractConnect";
import StringRetrive from "../../Ipfs/StringRetrive";
import FileBar from "../../components/FileBar";
import { Button, Grid, Snackbar } from "@material-ui/core";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import { FileDrop } from "react-file-drop";
import Loader from './../../components/loader'
import Validator from './../../utility/validator'

const DashBoard = (props) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [bufferState, setBufferState] = useState([]);
  const [contract, setContract] = React.useState("");
  const [hash, setHash] = useState([]);
  const [passHash, setPassHash] = useState("");
  const [filename, setfilename] = useState("");
  const [loader,setLoader] = useState(false)
  const [message,setMessage] = useState("")
  var jsscompress = require("js-string-compression");

  React.useEffect(() => {
    async function setup() {
      await loadWeb3();
      console.log("Web3 Loaded");
      const Contract = await ContractConnect();
      setContract(Contract);
    }
    setup();
  }, []);

  const captureFile = (files, event) => {
    setLoader(true)
    setMessage("Encrypting  your File")
    event.stopPropagation();
    event.preventDefault();
    const file = files[0];
    console.log(file);
    setfilename(file.name);
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
    setLoader(false)
    setMessage("Encryption Successful. Click Upload")
  };

  
  

  const convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    setBufferState(buffer);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)
    setMessage("Preparing to Upload to Blockchain")
    event.stopPropagation();
    //save document to IPFS,return its hash#, and set hash# to state
    const publicHASH =await Validator('publicHash');
    const publicKey = await StringRetrive(publicHASH);
    console.log(publicKey);
    console.log(bufferState);
    const buffer_encrypted = await EncrptPublicKeyFile(bufferState, publicKey);
    setMessage("Converted to Buffer. Uploading to Blockchain! ")
    console.log(buffer_encrypted.length);
    
var hm = new jsscompress.Hauffman();
var compressed = hm.compress(buffer_encrypted);
console.log(compressed.length)
    const hash = await StringUpload(compressed);
    setHash(hash);
    console.log(hash);
    const username = Validator('username')

    const result = await AddFile(contract, username, hash, filename);
    setMessage("Upload Request Sent to Blockchain")
    console.log(result);
    if(result.status===true){
      setMessage("Uploaded to Blockchain.")
      setUploadFiles([])
      setLoader(false);
    }
    else{
      setMessage("Upload failed, Please Try again")
      setLoader(false);
    }
  };
  // React.useEffect(() => {
  //   if (passHash == "") {
  //     return <Redirect to={ROUTES.SIGN_IN} />;
  //   }
  // }, [passHash]);

  // const Logout = () => {
  //   localStorage.removeItem("public_hash");
  // };

  const token = Validator('publicHash')
  const loginUser = Validator('username')
  if (!token || !loginUser) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }
  const styles = {
    border: "2px solid #6163FF",
    color: "#6163FF",
    padding: '20px',
    marginBottom:"10px",
    width:"100%",
    transition:'ease 2s all'
  };
  return (
    <>
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}> <h3> Choose file to send to IPFS </h3></Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
      <div  style={styles} >
        <FileDrop
       
          // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
          // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
          // onFrameDrop={(event) => console.log('onFrameDrop', event)}
          onDragOver={(event) => {console.log('onDragOver', event.currentTarget)
      
        event.currentTarget.style.color="#ECEDED"
        event.currentTarget.style.opacity="0.8"
        event.currentTarget.style.transition='ease 1s all'
        event.currentTarget.style.border="2px dashed #6163FF"
        
        }}
       onDragLeave={(event) => {console.log('onDragOver', event.currentTarget)
       event.currentTarget.style.background=""
       event.currentTarget.style.color=""
       event.currentTarget.style.opacity=""
       event.currentTarget.style.border=""
       }}
          onDrop={(files, event) => {
            event.currentTarget.style.background="yellowgreen"
            event.currentTarget.style.color="black"
            event.currentTarget.style.opacity=""
            event.currentTarget.style.border=""
            event.currentTarget.style.padding="25px"
            captureFile(files, event);
            setUploadFiles(files);
            console.log("Files ", files);
            console.log(typeof uploadFiles);
          }}
        >
          Drop a file here!
          <hr />
          {uploadFiles && console.log(uploadFiles)}
          {uploadFiles.length > 0 && (
            <FileBar
              filename={uploadFiles[0].name}
              filesize={uploadFiles[0].size}
            />
          )}
        </FileDrop>
      </div>



      <Button   style={{ background: "#6163FF", color: "#ECEDED" }}type="submit" onClick={onSubmit}>
        Upload 
     </Button>
      </Grid>
      <Grid></Grid>
    </Grid>
      {/* <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
      >
        <input {...getInputProps()} />
        Drop a file to get started.
      </div>
      {uploadFiles && <>{uploadFiles.length}</>}
      <Button
        onClick={PromiseChain}
        style={{
          borderRadius: 25,
          backgroundColor: "#2b3b4e",
          color: "white",
        }}
      >
        Upload Files
      </Button> */}

     
      {/* <form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile} />
        <Button type="submit">Send it</Button>
      </form> */}
  
<br/>
{message && <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
        
                  ContentProps={{
                    style:{background: "#6163FF", width:"200px", padding:"20px" }
                  }}
                  open={true}
                  autoHideDuration={3000}
                  action={
                    <div style={{ background: "#6163FF" }}>{message}</div>
                  }
                />}


      {/* <Button onClick={Logout}>Logout</Button> */}
    </>
  );
};

export default DashBoard;
