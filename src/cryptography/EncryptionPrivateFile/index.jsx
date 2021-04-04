const NodeRSA = require('node-rsa');


const EncrptPrivateKeyFile = async (text, private_key) => {
    private_key = await new NodeRSA(private_key);
    const encrypted_data = await private_key.encryptPrivate(text, 'base64');
    return encrypted_data
    
};

export default EncrptPrivateKeyFile;
