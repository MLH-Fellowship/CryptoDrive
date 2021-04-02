import React from "react";
import FileHolder from "./../../components/myfileHolder";
import loadWeb3 from "../../Web3/LoadWeb3";
import StringRetrive from "../../Ipfs/StringRetrive";
import ContractConnect from "../../Web3/ContractConnect";
import GetFileHash from "../../Web3/GetFileHashes";
import Validator from "./../../utility/validator";
import { Redirect } from "react-router-dom";
import * as ROUTES from "./../../constants/routes";

const MyFiles = () => {
  const [myFiles, setMyFiles] = React.useState([]); // Use this when you set up the IPFS thing.
  const [contract, setContract] = React.useState("");
  const [username, setUsername] = React.useState("");
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

  async function setup() {
    await loadWeb3();
    console.log("Web3 Loaded");
    const Contract = await ContractConnect();
    setContract(Contract);
  }
  React.useEffect(() => {
    setup();
  }, []);

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
      }
    }
  }

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
      {" "}
      <h2>My Files</h2>
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
          myFiles.map((file) => (
            <FileHolder name={file.filename} hash={file.filehash} />
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
