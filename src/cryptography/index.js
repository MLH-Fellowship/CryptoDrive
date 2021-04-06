const NodeRSA = require('node-rsa');

const EncrptPublicKey =async (text, public_key) => {
    var buffer = await Buffer.from(text);
    console.log(buffer);
    public_key = await new NodeRSA(public_key);
    const encrypted_data = await public_key.encrypt(buffer, 'base64');
    return encrypted_data
      
  };


const EncrptPublicKeyFile = async (text, public_key) => {
    public_key = await new NodeRSA(public_key);
    const encrypted_data = await public_key.encrypt(text, 'base64');
    return encrypted_data
    
};


const EncrptPrivateKeyFile = async (text, private_key) => {
    private_key = await new NodeRSA(private_key);
    const encrypted_data = await private_key.encryptPrivate(text, 'base64');
    return encrypted_data
    
};


const DefaultDecryptPrivateKey = async(text, private_key) => {
    private_key = await new NodeRSA(private_key);
    const decrypted=await private_key.decrypt(text, 'utf8')
    return decrypted;
  };

const DefaultDecryptPrivateKeyFile = async(text, private_key) => {
    private_key = await new NodeRSA(private_key);
    const decrypted=await private_key.decrypt(text);
    return decrypted;
  };
  
const DefaultDecryptPublicKeyFile = async(text, public_key) => {
    public_key = await new NodeRSA(public_key);
    const decrypted=await public_key.decryptPublic(text);
    return decrypted;
  };
  

export {
  EncrptPublicKey,
  EncrptPublicKeyFile,
  EncrptPrivateKeyFile,
  DefaultDecryptPrivateKey,
  DefaultDecryptPrivateKeyFile,
  DefaultDecryptPublicKeyFile
};