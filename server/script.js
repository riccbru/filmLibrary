"use strict";

import crypto from 'crypto';

const PASSWORD = "password";
const salt_ntt = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
const salt_doc = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
const salt_dis = "cccccccccccccccccccccccccccccccc"


const hash_ntt = await new Promise((resolve, reject) => {
  crypto.scrypt(PASSWORD, salt_ntt, 64, (err, derivedKey) => {
    if (err) { reject(err); }
    else { resolve(derivedKey.toString("hex")); }
  });
});

const hash_doc = await new Promise((resolve, reject) => {
  crypto.scrypt(PASSWORD, salt_doc, 64, (err, derivedKey) => {
    if (err) { reject(err); }
    else { resolve(derivedKey.toString("hex")); }
  });
});

const hash_dis = await new Promise((resolve, reject) => {
  crypto.scrypt(PASSWORD, salt_dis, 64, (err, derivedKey) => {
    if (err) { reject(err); }
    else { resolve(derivedKey.toString("hex")); }
  });
});

console.log(hash_ntt);
console.log(hash_doc);
console.log(hash_dis);

// hash_ntt = d4c44424b25da2e8e2833aa193a8b6402e77b220f5faf43dd316607fcfe3b6a6423d17105eed21e8c96dafdd8213c8bbaa054988250dd0a17b27aaa4912d81de
// hash_doc = db5d45926d848c2864b3449175d0df395186bce973e7fcc23b89688ee4acb3e0baaef915d9c172ce432610f1776491b66234583d2bab2398d940ca8911528bfb
// hash_dis = a9a1218132b5b36bc0c5fed433be9bbaa43eb58778f26e4a791b841a27be5384d5f1c40172b17ece069dece0bba42f1ff2152cf0f500e9d9d86b1c7d6d4c6be6

