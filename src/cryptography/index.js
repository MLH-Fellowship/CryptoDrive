const NodeRSA = require('node-rsa');

// Function to encrypt the text with the public key by taking the text and public key as input
const EncrptPublicKey =async (text, public_key) => {
    var buffer = await Buffer.from(text);
    public_key = await new NodeRSA(public_key);
    const encrypted_data = await public_key.encrypt(buffer, 'base64');
    return encrypted_data
      
  };

// Function to encrypt the file with the public key by taking the file buffer and the public key
const EncrptPublicKeyFile = async (text, public_key) => {
    public_key = await new NodeRSA(public_key);
    const encrypted_data = await public_key.encrypt(text, 'base64');
    return encrypted_data
    
};

// Function to encrypt the file buffer with the private key by taking the file buffer and private key as input
const EncrptPrivateKeyFile = async (text, private_key) => {
    private_key = await new NodeRSA(private_key);
    const encrypted_data = await private_key.encryptPrivate(text, 'base64');
    return encrypted_data
    
};

// Function to decrypt the text with the private key by taking the private key and text as input
const DefaultDecryptPrivateKey = async(text, private_key) => {
    private_key = await new NodeRSA(private_key);
    const decrypted=await private_key.decrypt(text, 'utf8')
    return decrypted;
  };

// Function to decrypt the file buffer with the private key by taking the buffer and private key as input
const DefaultDecryptPrivateKeyFile = async(text, private_key) => {
    private_key = await new NodeRSA(private_key);
    const decrypted=await private_key.decrypt(text);
    return decrypted;
  };

// Function to decrypt the file buffer with the public key by taking the buffer and public key as input
const DefaultDecryptPublicKeyFile = async(text, public_key) => {
    public_key = await new NodeRSA(public_key);
    const decrypted=await public_key.decryptPublic(text);
    return decrypted;
  };
  
// Exporting all the functions
export {
  EncrptPublicKey,
  EncrptPublicKeyFile,
  EncrptPrivateKeyFile,
  DefaultDecryptPrivateKey,
  DefaultDecryptPrivateKeyFile,
  DefaultDecryptPublicKeyFile
};