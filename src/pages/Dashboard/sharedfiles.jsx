import React from "react";
import FileHolder from "./../../components/myfileHolder";
import {loadWeb3,ContractConnect,GetShareFiles,GetPublic} from "../../Web3";
import {FileRetrive,StringRetrive} from "../../Ipfs";
import Validator from "./../../utility/validator";
import { Redirect } from "react-router-dom";
import * as ROUTES from "./../../constants/routes";
import {DefaultDecryptPublicKeyFile,DefaultDecryptPrivateKey} from "../../cryptography";
import Checkbox from "@material-ui/core/Checkbox";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { Button, Grid, Snackbar } from "@material-ui/core";
import AlertDialogSlide from "../../components/alert_dailog_slide";
import { Checkmark } from "../../components/checkmark/checkmark";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import _ from "lodash";
import FileSaver from "file-saver";
import mime from "mime-types";
import Loader from "../../components/loader";

const SharedFiles = ({ privateKey, setPrivateKey }) => {
  const [SharedFiles, setSharedFiles] = React.useState([]); // Use this when you set up the IPFS thing.
  const [contract, setContract] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [checked_index, setindex] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [keyFile, setKeyFile] = React.useState();
  const [nameDialog, setUnameDialog] = React.useState(false);
  const [checkedstyle, setCheckedStyle] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  // for testing, IPFS not in use
  // const [SharedFiles, setSharedFiles] = React.useState([
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
    let selectionStyle = {
      index: index,
      style: { background: "orange", opacity: "0.7" },
    };
    let unselectionStyle = { index: index, style: {} };
    setChecked(check_dummy);
    if (checked[index]) {
      const checked_index_dummmy = checked_index;
      checked_index_dummmy.push(index);
      setindex(checked_index_dummmy);
      setCheckedStyle(selectionStyle);
    }
    if (!checked[index]) {
      const checked_index_dummmy = checked_index;
      const i = checked_index_dummmy.indexOf(index);
      if (i !== -1) {
        checked_index_dummmy.splice(i, 1);
      }
      setindex(checked_index_dummmy);
      setCheckedStyle(unselectionStyle);
    }
  };

  async function setup() {
    await loadWeb3();
    console.log("Web3 Loaded");
    const Contract = await ContractConnect();
    setContract(Contract);
  }

  async function setupSharedFiles() {
    const user = getUserName();
    setUsername(user);

    if (contract && username) {
      console.log(contract);
      console.log(username);
      const filehashes = await GetShareFiles(contract, username);
      console.log(filehashes);

      if (filehashes) {
        setSharedFiles(filehashes);
        console.log(SharedFiles.length);
        setChecked(Array(SharedFiles.length).fill(false));
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
    if (privateKey && checked_index.length >= 0) {
      setLoader(true);
      setMessage(
        "We are processing your download files. Please wait for a while. If browser prompts, click on wait."
      );
      checked_index.map(async (value, j) => {
        console.log(SharedFiles[checked_index[j]]);
        const file_n = SharedFiles[checked_index[j]].filename;
        const file_h = SharedFiles[checked_index[j]].filehash;
        const sender = SharedFiles[checked_index[j]].sender;
        const sender_public_hash = await GetPublic(contract, sender);
        const sender_public_key = await StringRetrive(sender_public_hash);
        const encrypted_file = await FileRetrive(file_h);
        console.log(encrypted_file);
        const decrypt_receiver = await DefaultDecryptPrivateKey(
          encrypted_file,
          privateKey
        );
        const decrypt_sender = await DefaultDecryptPublicKeyFile(
          decrypt_receiver,
          sender_public_key
        );
        console.log(decrypt_sender);
        const type = mime.lookup(file_n);
        console.log(type);
        var blob = new Blob([decrypt_sender], {
          type: type,
        });
        FileSaver.saveAs(blob, file_n);
        setLoader(false);
        setMessage("Files Decrypted and saved. Please check downloads.");
      });
    }
  }

  React.useEffect(() => {
    setup();
  }, []);

  React.useEffect(() => {
    setupSharedFiles();
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
    // marginTop:"calc(100% - 625px)",
    color: "black",
    padding: 20,
  };
  return (
    <>
      <AlertDialogSlide
        title={" Add your private key to conitnue to download or share"}
        subtitle={"Your private key will not leave your browser"}
        open={modalVisible}
        handleClose={async () => {
          setModalVisible(false);
          await handleDownloadFiles();
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={5} lg={5}>
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
      </AlertDialogSlide>{" "}
      <Grid container >
        <Grid container item xs={12} sm={12} md={6} lg={6}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h2 style={{ margin: "0px" }}>Shared Files</h2>
          </Grid>
          {privateKey && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <VpnKeyIcon /> &nbsp;&nbsp;&nbsp;<b>Private Key Initialized</b>
              </div>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}
        style={{ display: "flex", justifyContent: "center",  }}
        >
          <div>
            <Button
              style={{
                textAlign:'right',
                borderRadius: 100,
                backgroundColor: "#6163FF",
                color: "#ECEDED",
                position:'fixed',
                zIndex:5,
                transition:'ease 0.7s all',
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
          </div>
        </Grid>

        <br />
      </Grid>
      {message && (
                <Snackbar
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
                />
      )}
      <hr />
      <div style={styles}>

        <Grid container item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={10} sm={10} md={6} lg={6}>
            <span style={{ color: "#6163FF" }}>
              <center>
                <b>Filename</b>
              </center>
            </span>
          </Grid>
          <Grid item xs={10} sm={10} md={6} lg={6}>
            <span style={{ color: "#6163FF" }}>
              <b>Sender</b>
            </span>
          </Grid>
          <hr />
        </Grid>
   
        {SharedFiles &&
          SharedFiles.map((file, index) => {
            let validStyle;
            if (checkedstyle.index === index) validStyle = checkedstyle.style;

            return (
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
                  <FileHolder name={file.filename} sender={file.sender} />
                </Grid>
              </Grid>
            );
          })}
        {SharedFiles.length == 0 && (
          <>
            <center>
              <h3>
                No Shared Files for <span>{Validator("username")}</span>
              </h3>
            </center>
          </>
        )}

        {
          SharedFiles == [] &&(
          <>
          <h2>Loading...</h2>
          </>
        )
        }

      </div>
    </>
  );
};
export default SharedFiles;
