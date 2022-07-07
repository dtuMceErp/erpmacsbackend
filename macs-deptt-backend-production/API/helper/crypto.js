const CryptoJS = require("crypto-js");

const passphrase = process.env.ENCRYPTION_CIPHER;

exports.encryptWithAES = (text) => {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

exports.decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
