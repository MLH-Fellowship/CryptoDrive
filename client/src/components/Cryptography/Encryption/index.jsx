var crypto = require("crypto");

const EncrptPublicKey= async(text,public_key)=>{
    var buffer = Buffer.from(text);
    const encrypted= await crypto.publicEncrypt(public_key, buffer);
    const encrypted_encoded = encrypted.toString("base64");
    return encrypted_encoded;
}

module.exports = EncrptPublicKey;