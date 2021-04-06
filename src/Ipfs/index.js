import IPFS from "ipfs-api";

const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});


const StringUpload = (data) => {
    var buffer = new Buffer(data);
    console.log("Buffer:")
    console.log(buffer)
    const hash = ipfs.add(buffer).then(
      (ipfsHash) => {
        return ipfsHash[0].hash;
      },
      function (error) {
        console.log(error);
      }
    );
    return hash;
  };

const StringRetrive = async (hash) => {
    const data = await ipfs.get(hash);
    const content = data[0].content;
    const retrived_string = content.toString("utf8");
    console.log(retrived_string);
    return retrived_string;
  };

const FileRetrive = async (hash) => {
    const data = await ipfs.get(hash);
    const content = data[0].content;
    const retrived_string = content.toString("utf8");
    console.log(retrived_string);
    return retrived_string;
  };
  
export {
    StringUpload,
    StringRetrive,
    FileRetrive
};