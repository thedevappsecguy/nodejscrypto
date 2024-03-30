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
//console.log(aliceSecret);
//The value of shared secret of Bob
//console.log(bobSecret);

const message = 'Hello, Bob! This is a secret message from AliceV.';



const aliceSecretBuffer = crypto.createHash('sha256').update(aliceSecret, 'hex').digest().slice(0, 32);
const bobSecretBuffer = crypto.createHash('sha256').update(bobSecret, 'hex').digest().slice(0, 32);
console.log('alice256:', aliceSecretBuffer);
console.log('bob256:', bobSecretBuffer);


// Encrypt message using AES-GCM with the shared secret
function encryptMessage(secret, message) {
    const iv = crypto.randomBytes(12); // Generate a random IV (Initialization Vector) of 12 bytes
    const cipher = crypto.createCipheriv('aes-256-gcm', secret, iv);
    let encrypted = cipher.update(message, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag(); // Get the authentication tag
    return { encrypted, iv: iv.toString('hex'), tag: tag.toString('hex') };
}

// Decrypt message using AES-GCM with the shared secret
function decryptMessage(secret, encryptedMessage) {
    const decipher = crypto.createDecipheriv('aes-256-gcm', secret, Buffer.from(encryptedMessage.iv, 'hex'));
    decipher.setAuthTag(Buffer.from(encryptedMessage.tag, 'hex')); // Set the authentication tag
    let decrypted = decipher.update(encryptedMessage.encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

// Encrypt the message using the shared secret
const encryptedMessage = encryptMessage(aliceSecretBuffer, message);

// Decrypt the message using the shared secret
const decryptedMessage = decryptMessage(bobSecretBuffer, encryptedMessage);

console.log('Decrypted Message:', decryptedMessage);