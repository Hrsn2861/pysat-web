import CryptoJS from 'crypto-js/crypto-js'

const KEY = CryptoJS.enc.Utf8.parse('Q2UKvCVZZBj655AI7wVUuj8jE4oiaiLn')// ""中与后台一样  密码
const IV = CryptoJS.enc.Utf8.parse('x3qqbVLE4XAGW9RI')// ""中与后台一样

/**
 * AES加密 ：字符串 key iv  返回hex
 */

export function Encrypt (word) {
  let key = KEY
  let iv = IV

  let srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Hex.stringify(encrypted.ciphertext)
}

export function Decrypt (word) {
  let key = KEY
  let iv = IV

  let srcs = CryptoJS.enc.Hex.parse(word)
  var decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
