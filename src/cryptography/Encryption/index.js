import { publicEncrypt } from "crypto";

const EncrptPublicKey = (text, public_key) => {
  var buffer = Buffer.from(text);
  console.log(buffer);
  const encrypted = publicEncrypt(public_key, buffer);
  const encrypted_encoded = encrypted.toString("base64");
  return encrypted_encoded;
};

export default EncrptPublicKey;
