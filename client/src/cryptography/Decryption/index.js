import { privateDecrypt } from "crypto";

const defaultDecryptPrivateKey = (text, private_key) => {
  var buffer = Buffer.from(text, "base64");
  var decrypted = privateDecrypt(private_key, buffer);
  return decrypted.toString("utf8");
};

export { defaultDecryptPrivateKey };
