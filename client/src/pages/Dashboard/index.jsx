import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import StringUpload from "../../Ipfs/StringUpload";
import ipfs from "../../Ipfs/ipfs";
import styles from "./index.module.css";
import { Button } from "@material-ui/core";

const DashBoard = (props) => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [bufferState, setBufferState] = useState([]);
  const [hash, setHash] = useState([]);
  // state = {      ipfsHash:null,      buffer:'',      ethAddress:'',      transactionHash:'',      txReceipt: ''    };

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
  // const usercaptureFile = async (file) => {
  //   let reader = new FileReader();
  //   reader.readAsArrayBuffer(file);
  //   return reader;
  //   // reader.onloadend = async () => {
  //   //   await convertToBuffer(reader);
  //   // };
  //   // return 0;
  // };

  // const convertToBuffer = async (reader) => {
  //   console.log(reader.result)
  //   if (reader.result) {
  //     console.log("Type of Array Buffer ", typeof reader.result);
  //     const buffer = await Buffer.from(reader.result);

  //     console.log("Is it a buffer? ", buffer);
  //     if (buffer) {
  //       setBufferState(buffer);
  //       return 0;
  //     }
  //   } else {
  //     console.log("I dont have any arrayBuffer");
  //     return 1;
  //   }
  // };

  // async function upload(buffer) {
  //   if (buffer.length > 0) {
  //     const hash = await ipfs.add(buffer).then(
  //       (ipfsHash) => {
  //         return ipfsHash[0].hash;
  //       },
  //       function (error) {
  //         console.log(error);
  //       }
  //     );
  //     console.log(hash);
  //     return hash;
  //   } else {
  //     console.log("buffer", buffer);
  //   }
  // }

  // const onDrop = useCallback((acceptedFiles) => {
  //   setUploadFiles([...acceptedFiles]);
  // });

  // const PromiseChain = () => {
  //   try {
  //     console.log(uploadFiles, typeof uploadFiles);
  //     uploadFiles.forEach(async (file) => {
  //       usercaptureFile(file)
  //         .then((reader) => {
  //           reader.onloadend = async () => {
  //             return await convertToBuffer(reader);
  //           };
  //           return reader.onloadend();
  //         })
  //         .then((s) => {
  //           return upload(bufferState);
  //         })
  //         .then((value) => {
  //           console.log(value);
  //         });
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   accepts: "image/*",
  //   multiple: true,
  // });

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
        <Button type="submit">
          Send it
        </Button>
      </form>
    </>
  );
};

export default DashBoard;
