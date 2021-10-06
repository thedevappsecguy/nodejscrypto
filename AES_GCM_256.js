
const crypto = require('crypto');

const MESSAGE = 'This is a secret message';
const mykey = crypto.randomBytes(32)

//https://datatracker.ietf.org/doc/html/rfc5116
//There are four inputs for authenticated encryption: the secret key, initialization vector (IV) (sometimes called a nonce†), the plaintext itself, and optional additional authentication data (AAD). 
//The nonce and AAD are passed in the clear. There are two outputs: the ciphertext, which is exactly the same length as the plaintext, and an authentication tag (the "tag"). The tag is sometimes called the message authentication code (MAC) or integrity check value (ICV).

console.log(mykey.toString('hex'))
const IV = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(
  'aes-256-gcm',
  mykey,
  IV
);

let encrypted = cipher.update(MESSAGE, 'utf8', 'hex');
encrypted += cipher.final('hex');

const auth_tag = cipher.getAuthTag().toString('hex');

console.table({
  IV: IV.toString('hex'),
  encrypted: encrypted,
  auth_tag: auth_tag
});

//Encryped payload with IV ,ciphettext,auth tag
const payload = IV.toString('hex') + encrypted + auth_tag;

const payload64 = Buffer.from(payload, 'hex').toString('base64');
console.log(payload64);

//Bob decrypts
const bob_payload = Buffer.from(payload64, 'base64').toString('hex');

const bob_iv = bob_payload.substr(0, 32);
const bob_encrypted = bob_payload.substr(32, bob_payload.length - 32 - 32);
const bob_auth_tag = bob_payload.substr(bob_payload.length - 32, 32);

console.table({ bob_iv, bob_encrypted, bob_auth_tag });

try {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(mykey, 'hex'),
    Buffer.from(bob_iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(bob_auth_tag, 'hex'));

  let decrypted = decipher.update(bob_encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  console.table({ DecyptedMessage: decrypted });
} catch (error) {
  console.log(error.message);
}
