const crypto = require('crypto');

//https://datatracker.ietf.org/doc/html/rfc3526
//https://datatracker.ietf.org/doc/html/rfc3526#page-5

const alice = crypto.getDiffieHellman('modp16');

const bob = crypto.getDiffieHellman('modp16');

alice.generateKeys();
bob.generateKeys();


const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

//To verify we are using the 4096 bit prime
console.log(alice.getPrime().toString('hex').length * 4);
//To verify we are using the 4096 bit prime
console.log(bob.getPrime().toString('hex').length * 4);
//To verify both have generated the same secret
console.log('Shared secrets are : ' , aliceSecret === bobSecret);
//The value of shared secret of Alice
console.log(aliceSecret);
//The value of shared secret of Bob
console.log(bobSecret);
