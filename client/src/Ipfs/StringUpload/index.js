import IPFS from "ipfs-api";

const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const StringUpload = (data) => {
  var buffer = Buffer.from(data);
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
