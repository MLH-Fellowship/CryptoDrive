const NodeRSA = require('node-rsa');

const DefaultDecryptPrivateKeyFile = async(text, private_key) => {
  private_key = await new NodeRSA(private_key);
  const decrypted=await private_key.decrypt(text);
  return decrypted;
}

export default DefaultDecryptPrivateKeyFile;
