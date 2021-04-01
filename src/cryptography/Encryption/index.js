const NodeRSA = require('node-rsa');

const EncrptPublicKey =async (text, public_key) => {
  var buffer = await Buffer.from(text);
  console.log(buffer);
  public_key = await new NodeRSA(public_key);
  const encrypted_data = await public_key.encrypt(buffer, 'base64');
  return encrypted_data
    
};

export default EncrptPublicKey;
