import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import StringUpload from "../../Ipfs/StringUpload";
import ipfs from "../../Ipfs/ipfs";
import styles from "./index.module.css";
import { Button } from "@material-ui/core";
import * as ROUTES from "./../../constants/routes";
import { Redirect } from "react-router-dom";

const DashBoard = (props) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [bufferState, setBufferState] = useState([]);
  const [hash, setHash] = useState([]);
  const [passHash, setPassHash] = useState("");
  function getPassHash() {
    const tokenString = localStorage.getItem("public_hash");
    const userToken = JSON.parse(tokenString);
    return userToken;
  }

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];

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
    await ipfs.add(bufferState, (err, ipfsHash) => {
      console.log(ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      setHash(ipfsHash[0].hash);
    });
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
      <form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile} />
        <Button type="submit">Send it</Button>
      </form>
      {/* <Button onClick={Logout}>Logout</Button> */}
    </>
  );
};

export default DashBoard;
