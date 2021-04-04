const NodeRSA = require('node-rsa');

const DefaultDecryptPublicKeyFile = async(text, public_key) => {
  public_key = await new NodeRSA(public_key);
  const decrypted=await public_key.decryptPublic(text);
  return decrypted;
}

export default DefaultDecryptPublicKeyFile;
