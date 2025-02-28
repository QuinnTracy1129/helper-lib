import CryptoJS from 'crypto-js';

let AES_PEPPER = '';

const setConfig = (pepper) => {
  AES_PEPPER = pepper;
};

const encrypt = (salt) => {
  if (!salt) return '';

  return CryptoJS.AES.encrypt(JSON.stringify(salt), AES_PEPPER).toString();
};

const decrypt = (salt) => {
  if (!salt) return {};

  return JSON.parse(CryptoJS.AES.decrypt(salt, AES_PEPPER).toString(CryptoJS.enc.Utf8));
};

export const axioKit = {
  setConfig,
  encrypt,
  decrypt,
};
