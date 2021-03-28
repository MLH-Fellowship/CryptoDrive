const IPFS = require('ipfs-api');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const StringRetrive = async (hash)=>{
    const data= await ipfs.get(hash);
    const content=data[0].content;
    const retrived_string=content.toString("utf8")
    console.log(retrived_string)
    return retrived_string

}

module.exports=StringRetrive;

