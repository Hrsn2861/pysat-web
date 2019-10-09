import CryptoJS from 'crypto-js/crypto-js'

const KEY = CryptoJS.enc.Utf8.parse("Q2UKvCVZZBj655AI7wVUuj8jE4oiaiLn");//""中与后台一样  密码
const IV = CryptoJS.enc.Utf8.parse("x3qqbVLE4XAGW9RI");//""中与后台一样

/**
 * AES加密 ：字符串 key iv  返回hex
 */

export function Encrypt(word) {
    let key = KEY
    let iv = IV

	console.log(word)
    let srcs = CryptoJS.enc.Utf8.parse(word);
	console.log(srcs)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
	console.log(encrypted.ciphertext)
	return CryptoJS.enc.Hex.stringify(encrypted.ciphertext)
    // return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}


export function Decrypt(word) {
    let key = KEY
    let iv = IV

	console.log("23333")
    //let base64 = CryptoJS.enc.Hex.parse(word);
    //let src = CryptoJS.enc.Base64.stringify(base64);
	let srcs = CryptoJS.enc.Hex.parse(word);
	//console.log(srcs)
	//console.log(src)
	console.log("987")
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
	console.log("123456")
	//console.log(decrypt.ciphertext)
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	//console.log(decryptedStr)
    return decryptedStr.toString();
}