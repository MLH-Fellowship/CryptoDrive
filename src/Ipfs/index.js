import IPFS from "ipfs-api";

// Initialising a object IPFS with the Public Gateway of Infura with port 5001

const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

// Function to upload a string to IPFS and return the hash for which it is stored

const StringUpload = (data) => {
    var buffer = new Buffer(data);
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

// Function to retrive the string from IPFS by taking the hash as input

const StringRetrive = async (hash) => {
    const data = await ipfs.get(hash);
    const content = data[0].content;
    const retrived_string = content.toString("utf8");
    return retrived_string;
  };

// Function to retrive the file from the IPFS by taking the hash as input

const FileRetrive = async (hash) => {
    const data = await ipfs.get(hash);
    const content = data[0].content;
    const retrived_string = content.toString("utf8");
    return retrived_string;
  };

// Exporting all the functions
  
export {
    StringUpload,
    StringRetrive,
    FileRetrive
};