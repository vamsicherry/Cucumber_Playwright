
import * as CryptoJs from 'crypto-ts';
const secretkey=process.env.secretkey ? process.env.secretkey:"";
export function encrypt(data:string)
{
    return CryptoJs.AES.encrypt(data,secretkey).toString();
}

export function decrypt(data:string)
{
      return CryptoJs.AES.decrypt(data,secretkey).toString(CryptoJs.enc.Utf8);
}