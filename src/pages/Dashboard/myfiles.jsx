import React from "react";
import FileHolder from "./../../components/myfileHolder";
import loadWeb3 from "../../Web3/LoadWeb3";
import StringRetrive from "../../Ipfs/StringRetrive";
import ContractConnect from "../../Web3/ContractConnect";
import GetFileHash from "../../Web3/GetFileHashes";
const MyFiles = () => {
     const [myFiles, setMyFiles]=React.useState([]) // Use this when you set up the IPFS thing.
  const [contract, setContract] = React.useState("");
  const [username,setUsername] = React.useState("");
  // for testing, IPFS not in use 
  // const [myFiles, setMyFiles] = React.useState([
  //   { hash: "23y129839122323321321312", name: "HelloWorld.jpg" },
  //   { hash: "23y129839122323321321312", name: "HelloWorld.jpg" },
  //   { hash: "23y129839122323321321312", name: "HelloWorld.jpg" },
  // ]); 
  function getUserName() {
    const tokenString = localStorage.getItem("user_name");
    if(tokenString){
    const userToken = JSON.parse(tokenString);
    return userToken;}
    else{
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

  React.useEffect(async()=>{
    const user = getUserName();
    setUsername(user)

    if(contract && username){
      console.log(contract)
      console.log(username)
      const filehashes =await GetFileHash(contract,username)
      console.log(filehashes);  
      
      if(filehashes){
    setMyFiles(filehashes);}
    }
  },[contract])
  

  const styles = {
    border: "1px solid black",
    width: 900,
    color: "black",
    padding: 20,
  };
  return (
    <>  <h2>My Files</h2>
    <br />
    <span
      style={{
        
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
    <span><b>Filename</b></span>
    <span><b>FileHash</b></span>
  </span>
    <hr/>
      <div style={styles}>
      
        {myFiles && myFiles.map((file)=><FileHolder name={file.filename} hash={file.filehash}/ >)}
      </div>
    </>
  );
};
export default MyFiles;
