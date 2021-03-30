import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import StringUpload from "../../Ipfs/StringUpload";
import ipfs from "../../Ipfs/ipfs";
import styles from "./index.module.css";
import { Button } from "@material-ui/core";

const DashBoard = (props) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [bufferState, setBufferState] = useState([]);

  const usercaptureFile = async (file) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      await convertToBuffer(reader);
      setBufferState([]);
    };
    return 0;
  };

  const convertToBuffer = async (reader) => {
    if (reader.result) {
      console.log("Type of Array Buffer ", typeof reader.result);
      const buffer = await Buffer.from(reader.result);

      console.log("Is it a buffer? ", buffer);
      if (buffer) setBufferState(buffer);
    } else {
      console.log("I dont have any arrayBuffer");
    }
  };

  async function upload(buffer) {


    if (buffer.length > 0) {
      const hash = await ipfs.add(buffer).then(
        (ipfsHash) => {
          return ipfsHash[0].hash;
        },
        function (error) {
          console.log(error);
        }
      );
      console.log(hash);
    } else {
      console.log("buffer", buffer);
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    setUploadFiles(...acceptedFiles);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
      >
        <input {...getInputProps()} />
        Drop a file to get started.
        {uploadFiles && <>{uploadFiles.length}</>}
      </div>

      <Button
        onClick={() => {
          uploadFiles.forEach(async (file) => {
            await usercaptureFile(file);
            await upload(bufferState);
          });
        }}
        style={{
          borderRadius: 25,
          backgroundColor: "#2b3b4e",
          color: "white",
        }}
      >
        Upload Files
      </Button>
    </>
  );
};

export default DashBoard;
