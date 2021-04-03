import React from "react";
import FileHolder from "./../../components/myfileHolder";
import loadWeb3 from "../../Web3/LoadWeb3";
import FileRetrive from "../../Ipfs/FileRetrive";
import StringRetrive from "../../Ipfs/StringRetrive";
import ContractConnect from "../../Web3/ContractConnect";
import GetFileHash from "../../Web3/GetFileHashes";
import Validator from "./../../utility/validator";
import { Redirect } from "react-router-dom";
import * as ROUTES from "./../../constants/routes";
import Checkbox from "@material-ui/core/Checkbox";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import { Button } from "@material-ui/core";
import AlertDialogSlide from "../../components/alert_dailog_slide";
import { Checkmark } from "../../components/checkmark/checkmark";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import _ from "lodash";
import FileSaver from "file-saver";
import mime from "mime-types";
import GetPublic from "../../Web3/GetPublicHash";
import EncrptPrivateKeyFile from "../../cryptography/EncryptionPrivateFile";
import EncrptPublicKey from "../../cryptography/Encryption";
import StringUpload from "../../Ipfs/StringUpload";
import DefaultDecryptPrivateKeyFile from "../../cryptography/DecryptionFile";
const MyFiles = ({ privateKey, setPrivateKey }) => {
  const [myFiles, setMyFiles] = React.useState([]); // Use this when you set up the IPFS thing.
  const [contract, setContract] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [checked_index, setindex] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [keyFile, setKeyFile] = React.useState();

  // for testing, IPFS not in use
  // const [myFiles, setMyFiles] = React.useState([
  //   { hash: "23y129839122323321321312", name: "HelloWorld.jpg" },
  //   { hash: "23y129839122323321321312", name: "HelloWorld.jpg" },
  //   { hash: "23y129839122323321321312", name: "HelloWorld.jpg" },
  // ]);
  function getUserName() {
    const tokenString = localStorage.getItem("user_name");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken;
    } else {
      return false;
    }
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


  const handleChange = (index) => {
    const check_dummy = checked;
    check_dummy[index] = !check_dummy[index];
    setChecked(check_dummy);
    if (checked[index]) {
      const checked_index_dummmy = checked_index;
      checked_index_dummmy.push(index);
      setindex(checked_index_dummmy);
    }
    if (!checked[index]) {
      const checked_index_dummmy = checked_index;
      const i = checked_index_dummmy.indexOf(index);
      if (i !== -1) {
        checked_index_dummmy.splice(i, 1);
      }
      setindex(checked_index_dummmy);
    }
  };

  async function setup() {
    await loadWeb3();
    console.log("Web3 Loaded");
    const Contract = await ContractConnect();
    setContract(Contract);
  }

  async function setupMyFiles() {
    const user = getUserName();
    setUsername(user);

    if (contract && username) {
      console.log(contract);
      console.log(username);
      const filehashes = await GetFileHash(contract, username);
      console.log(filehashes);

      if (filehashes) {
        setMyFiles(filehashes);
        console.log(myFiles.length);
        setChecked(Array(myFiles.length).fill(false));
        console.log(checked);
      }
    }
  }

  function readkeyFile(file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      setPrivateKey(evt.target.result);
      console.log(evt.target.result);
    };
    reader.onerror = () => console.log("error");
  }

  async function handleDownloadFiles() {
    if (keyFile && checked_index.length >= 0) {
      checked_index.map(async (value, j) => {
        console.log(myFiles[checked_index[j]]);
        const file_n = myFiles[checked_index[j]].filename;
        const file_h = myFiles[checked_index[j]].filehash;
        console.log(file_h);
        const encryted_file = await FileRetrive(file_h);
        console.log(encryted_file);
        console.log(privateKey);
        var jsscompress = require("js-string-compression");
        var hm = new jsscompress.Hauffman();
        const decr = await DefaultDecryptPrivateKeyFile(
          await hm.decompress(encryted_file),
          privateKey
        );

        const type = mime.lookup(file_n);
        console.log(type);
        var blob = new Blob([decr], {
          type: type,
        });
        FileSaver.saveAs(blob, file_n);
        console.log(decr);
      });
    }
  }

  async function handleShareFiles() {
    if (keyFile && checked_index.length >= 0) {
      checked_index.map(async (value, j) => {
        console.log(myFiles[checked_index[j]]);
        const file_n = myFiles[checked_index[j]].filename;
        const file_h = myFiles[checked_index[j]].filehash;
        console.log(file_h);
        const encryted_file = await FileRetrive(file_h);
        console.log(encryted_file);
        console.log(privateKey);
        var jsscompress = require("js-string-compression");
        var hm = new jsscompress.Hauffman();
        const decr = await DefaultDecryptPrivateKeyFile(
          await hm.decompress(encryted_file),
          privateKey
        );
        const receiver='uzumaki';
        const public_receiver=await GetPublic(contract,receiver);
        console.log(public_receiver);
        const public_key_receiver=await StringRetrive(public_receiver);
        console.log(public_key_receiver)
        const encrypted_sender=await EncrptPrivateKeyFile(decr,privateKey);
        console.log(encrypted_sender);
        const encrypted_receiver=await EncrptPublicKey(encrypted_sender,public_key_receiver);
        console.log(encrypted_receiver);
        const encrypted_receiver_sender_hash=await StringUpload(encrypted_receiver);
        console.log(encrypted_receiver_sender_hash)

        console.log(decr);
      });
    }
  }

  React.useEffect(() => {
    setup();
  }, []);

  React.useEffect(() => {
    setupMyFiles();
  }, [contract]);

  const token = Validator("publicHash");
  const loginuser = Validator("username");
  if (!token || !loginuser) {
    console.log(token);
    console.log(loginuser);
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
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
      >
        <div
          style={{
            paddingTop: "3em",
            display: "flex",
          }}
        >
          <input
            type="file"
            id="fileupload"
            style={{ display: "none" }}
            onChange={(event) => {
              setKeyFile(event.target.files[0]);
              readkeyFile(event.target.files[0]);
              console.log(keyFile);
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
            }}
          >
            Add Private Key
          </label>
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
        </div>
      </AlertDialogSlide>{" "}
      <h2>My Files</h2>
      {privateKey && (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <VpnKeyIcon />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          style={{
            marginLeft: "10px",
            borderRadius: 25,
            backgroundColor: "#2b3b4e",
            color: "white",
          }}
          onClick={async () => {
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
            backgroundColor: "#2b3b4e",
            color: "white",
          }}
          onClick={async () => {
            if (checked_index.length <= 0) {
              window.alert("please select a file before sharing");
              return;
            }
            if (!privateKey) {
              setModalVisible(true);
            }
            await handleShareFiles();
          }}
        >
          <ScreenShareIcon />
        </Button>
      </div>
      <br />
      <span
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <span>
          <b>Filename</b>
        </span>
        <span>
          <b>FileHash</b>
        </span>
      </span>
      <hr />
      <div style={styles}>
        {myFiles &&
          myFiles.map((file, index) => (
            <>
              <Checkbox
                checked={checked[index]}
                onChange={() => handleChange(index)}
                name="checkedB"
                color="primary"
              />

              <FileHolder name={file.filename} hash={file.filehash} />
            </>
          ))}
        {myFiles == "" && (
          <>
            <center>
              <h3>
                No Files yet by <span>{Validator("username")}</span>
              </h3>
            </center>
          </>
        )}
      </div>
    </>
  );
};
export default MyFiles;
