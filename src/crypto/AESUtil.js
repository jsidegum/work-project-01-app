import CryptoJS from 'crypto-js';

export class AESUtil {

    constructor() {
        this._keySize = 256;
        this._ivSize = 128;
        this._iterationCount = 1989;
    }

    get keySize() {
        return this._keySize;
    }

    set keySize(value) {
        this._keySize = value;
    }

    get iterationCount() {
        return this._iterationCount;
    }

    set iterationCount(value) {
        this._iterationCount = value;
    }

    generateKey(salt, passPhrase) {
        return CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
            keySize: this.keySize / 32,
            iterations: this._iterationCount
        })
    }

    encryptWithIvSalt(salt, iv, passPhrase, plainText) {
        let key = this.generateKey(salt, passPhrase);
        let encrypted = CryptoJS.AES.encrypt(plainText, key, {
            iv: CryptoJS.enc.Hex.parse(iv)
        });
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    }

    decryptWithIvSalt(salt, iv, passPhrase, cipherText) {
        let key = this.generateKey(salt, passPhrase);
        let cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(cipherText)
        });
        let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
            iv: CryptoJS.enc.Hex.parse(iv)
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    encrypt(passPhrase, plainText) {
        let iv = CryptoJS.lib.WordArray.random(this._ivSize / 8).toString(CryptoJS.enc.Hex);
        let salt = CryptoJS.lib.WordArray.random(this.keySize / 8).toString(CryptoJS.enc.Hex);
        let ciphertext = this.encryptWithIvSalt(salt, iv, passPhrase, plainText);
        return salt + iv + ciphertext;
    }

    decrypt(passPhrase, cipherText) {
        let ivLength = this._ivSize / 4;
        let saltLength = this.keySize / 4;
        let salt = cipherText.substr(0, saltLength);
        let iv = cipherText.substr(saltLength, ivLength);
        let encrypted = cipherText.substring(ivLength + saltLength);
        return this.decryptWithIvSalt(salt, iv, passPhrase, encrypted);
    }

}

export const aesUtil = new AESUtil();