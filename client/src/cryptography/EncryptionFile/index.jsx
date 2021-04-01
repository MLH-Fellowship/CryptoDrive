const NodeRSA = require('node-rsa');


const EncrptPublicKeyFile = async (text, public_key) => {
    public_key = await new NodeRSA(public_key);
    const encrypted_data = await public_key.encrypt(text, 'base64');
    return encrypted_data
    
};

export default EncrptPublicKeyFile;
