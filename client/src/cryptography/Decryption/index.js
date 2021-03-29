import { privateDecrypt } from "crypto";

const DefaultDecryptPrivateKey = (text, private_key) => {
  var buffer = Buffer.from(text, "base64");
  var decrypted = privateDecrypt(private_key, buffer);
  return decrypted.toString("utf8");
};

export default DefaultDecryptPrivateKey;
