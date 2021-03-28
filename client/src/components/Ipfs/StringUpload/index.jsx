const IPFS = require('ipfs-api');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const StringUpload=async (data)=>{
    var buffer = await Buffer.from(data);
    const hash = await ipfs.add(buffer).then( ipfsHash => {
        return ipfsHash[0].hash;
       }, function(error) {
           console.log(error);
       });
    return hash;
}

module.exports = StringUpload;
