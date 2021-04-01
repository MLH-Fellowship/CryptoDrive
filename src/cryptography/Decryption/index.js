const NodeRSA = require('node-rsa');

const DefaultDecryptPrivateKey = async(text, private_key) => {
  private_key = await new NodeRSA(private_key);
  const decrypted=await private_key.decrypt(text, 'utf8')
  return decrypted;
}

export default DefaultDecryptPrivateKey;
