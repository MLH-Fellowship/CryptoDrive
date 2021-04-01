import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import StringUpload from "../../Ipfs/StringUpload";
import ipfs from "../../Ipfs/ipfs";
import EncrptPublicKeyFile from "../../cryptography/EncryptionFile";
import GetPassHash from "../../Web3/GetPassHash";
import GetPublic from "../../Web3/GetPublicHash";
import AddFile from "../../Web3/AddFileHash";
import loadWeb3 from "../../Web3/LoadWeb3";
import ContractConnect from "../../Web3/ContractConnect";
import StringRetrive from "../../Ipfs/StringRetrive";
import FileBar from "../../components/FileBar";
import { Button } from "@material-ui/core";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import { FileDrop } from "react-file-drop";
const DashBoard = (props) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [bufferState, setBufferState] = useState([]);
  const [contract, setContract] = React.useState("");
  const [hash, setHash] = useState([]);
  const [passHash, setPassHash] = useState("");
  const [filename, setfilename] = useState("");

  function getPassHash() {
    const tokenString = localStorage.getItem("public_hash");
    const userToken = JSON.parse(tokenString);
    return userToken;
  }
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
    event.stopPropagation();
    event.preventDefault();
    const file = files[0];
    console.log(file);
    setfilename(file.name);
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    setBufferState(buffer);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    //save document to IPFS,return its hash#, and set hash# to state
    const publicHASH=getPassHash();
    const publicKey=StringRetrive(publicHASH);
    console.log(publicKey);
    console.log(bufferState);
    const buffer_encrypted=await EncrptPublicKeyFile(bufferState,publicKey);
    console.log(buffer_encrypted);
    const hash=await StringUpload(buffer_encrypted);
    setHash(hash);
    console.log(hash);
    const username="kkkk";
    const result=await AddFile(contract,username,hash,filename);
    console.log(result);


  };
  // React.useEffect(() => {
  //   if (passHash == "") {
  //     return <Redirect to={ROUTES.SIGN_IN} />;
  //   }
  // }, [passHash]);

  // const Logout = () => {
  //   localStorage.removeItem("public_hash");
  // };

  const token = getPassHash();

  if (!token) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }
  const styles = {
    border: "1px solid black",
    width: 600,
    color: "black",
    padding: 20,
  };
  return (
    <>
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

      <h3> Choose file to send to IPFS </h3>
      {/* <form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile} />
        <Button type="submit">Send it</Button>
      </form> */}
      <div style={styles}>
        <FileDrop
          // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
          // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
          // onFrameDrop={(event) => console.log('onFrameDrop', event)}
          // onDragOver={(event) => console.log('onDragOver', event)}
          // onDragLeave={(event) => console.log('onDragLeave', event)}
          onDrop={(files, event) => {
            captureFile(files, event);
            setUploadFiles(files);
            console.log("Files ", files);
            console.log(typeof uploadFiles);
          }}
        >
          Drop some files here!
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
      <Button type="submit" onClick={onSubmit}>
        Send it
      </Button>
      {/* <Button onClick={Logout}>Logout</Button> */}
    </>
  );
};

export default DashBoard;
