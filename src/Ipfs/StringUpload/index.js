import ipfs from "../ipfs";

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

export default StringUpload;
