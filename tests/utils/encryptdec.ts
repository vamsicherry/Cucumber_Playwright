import { encrypt, decrypt } from "./encdec";

const username = "samsandy@gmail.com";
const password = "samsandy@gmail.com";

const encUser = encrypt(username);
const encPass = encrypt(password);

console.log("Encrypted Username:", encUser);
console.log("Encrypted Password:", encPass);

console.log("Decrypted Username:", decrypt(encUser));
console.log("Decrypted Password:", decrypt(encPass));