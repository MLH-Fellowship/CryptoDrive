import React from "react";
import FileHolder from "./../../components/myfileHolder";
import loadWeb3 from "../../Web3/LoadWeb3";
import StringRetrive from "../../Ipfs/StringRetrive";
import ContractConnect from "../../Web3/ContractConnect";
import GetFileHash from "../../Web3/GetFileHashes";
import Validator from "./../../utility/validator";
import { Redirect } from "react-router-dom";
import * as ROUTES from "./../../constants/routes";
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash'

const MyFiles = () => {
  const [myFiles, setMyFiles] = React.useState([]); // Use this when you set up the IPFS thing.
  const [contract, setContract] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [checked_index, setindex] = React.useState([])
  const [checked, setChecked] =React.useState([]);


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

  const handleChange=(index)=>{
    const check_dummy=checked;
    check_dummy[index]=!check_dummy[index]
    setChecked(check_dummy)
    console.log("working handle")
    console.log(checked)
    if(checked[index])
    {
      const checked_index_dummmy=checked_index;
      checked_index_dummmy.push(index);
      setindex(checked_index_dummmy)
    }
    if(!checked[index])
    {
      const checked_index_dummmy=checked_index;
      const i = checked_index_dummmy.indexOf(index);
      if (i !== -1) {
        checked_index_dummmy.splice(i, 1);
      }
    setindex(checked_index_dummmy)
    }
    console.log(checked_index);
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
        console.log(myFiles.length)
        setChecked(Array(myFiles.length).fill(false))
        console.log(checked);
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
          myFiles.map((file,index) => (<>
          <Checkbox
            checked={checked[index]}
            onChange={() => handleChange(index)}
            name="checkedB"
            color="primary"
          />
          
            <FileHolder name={file.filename} hash={file.filehash} />
         </> ))}
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
