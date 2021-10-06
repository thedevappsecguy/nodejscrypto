const crypto = require('crypto');
const alice = crypto.createECDH('secp384r1');
//console.table(crypto.getCurves());
//https://www.johndcook.com/blog/2018/08/21/a-tale-of-two-elliptic-curves/
alice.generateKeys();

//not required to print the generated keys 
//const prallice = alice.getPrivateKey().toString('hex')
//console.log('Alice private key: ', prallice);

const bob = crypto.createECDH('secp384r1');
bob.generateKeys();

//not required to print the generated keys 
//const prbob = bob.getPrivateKey().toString('hex')
//console.log('bob private key: ', prbob);

const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');
const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

//generate shared keys using public key of other participant 
const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64, 'base64', 'hex');
const bobSharedKey = bob.computeSecret(alicePublicKeyBase64, 'base64', 'hex');
//these generated hared keys should be same 

//Shared key in hex
console.log('Alice shared Key: ', aliceSharedKey);
//Shared key in hex
console.log('Bob shared Key: ', bobSharedKey);
//compare if shared keys are same
console.log(aliceSharedKey === bobSharedKey);
//Shared key length in bits (=384 bits)
console.log(
  'Shared Key length of alice(same as bob): ',
  aliceSharedKey.length * 4
);
console.log(
  'Shared Key length of bob(same as alice): ',
  bobSharedKey.length * 4
);
