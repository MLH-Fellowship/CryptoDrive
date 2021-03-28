var crypto = require("crypto");

const DecryptPrivateKey=async (text,private_key)=>{
    var buffer = Buffer.from(text, "base64");
    var decrypted = crypto.privateDecrypt(private_key, buffer);
    return decrypted.toString("utf8");
}

module.exports=DecryptPrivateKey;