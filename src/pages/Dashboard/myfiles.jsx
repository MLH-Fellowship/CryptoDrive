import React from "react";
import FileHolder from "./../../components/myfileHolder";
const MyFiles = () => {
  //    const [myFiles, setMyFiles]=React.useState([]) // Use this when you set up the IPFS thing.
  
  // for testing, IPFS not in use 
  const [myFiles, setMyFiles] = React.useState([
    { hash: "23y129839122323321321312", name: "HelloWorld.jpg" },
    { hash: "23y129839122323321321312", name: "HelloWorld.jpg" },
    { hash: "23y129839122323321321312", name: "HelloWorld.jpg" },
  ]); 
  const styles = {
    border: "1px solid black",
    width: 600,
    color: "black",
    padding: 20,
  };
  return (
    <>  <h2>My Files</h2>
    <br />
    <hr/>
      <div style={styles}>
      
        {myFiles && myFiles.map((file)=><FileHolder name={file.name} hash={file.hash}/ >)}
      </div>
    </>
  );
};
export default Myfiles;
