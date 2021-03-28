var crypto = require("crypto");

const DecryptPrivateKey=async (text,private_key)=>{
    var buffer = await Buffer.from(text, "base64");
    var decrypted = await crypto.privateDecrypt(private_key, buffer);
    return decrypted.toString("utf8");
}

module.exports=DecryptPrivateKey;