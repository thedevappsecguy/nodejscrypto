
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

var key = new Buffer('8CBDEC62EB4DCA778F842B02503011B2', 'hex')
var src = new Buffer('0002123401010100000000000000c631', 'hex')
// ruleid:node_aes_ecb
cipher = crypto.createCipheriv("aes-128-ecb", key, '')
cipher.setAutoPadding(false)
result = cipher.update(src).toString('hex');
result += cipher.final().toString('hex');
"result   : " + result

// ruleid:node_sha1
require("crypto")
    .createHash("sha1")
    .update("Man oh man do I love node!")
    .digest("hex");

// ruleid:node_md5
require("crypto")
    .createHash("md5")
    .update("Man oh man do I love node!")
    .digest("hex");

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    // ruleid:node_aes_ecb
    let cipher = crypto.createCipheriv('aes-256-ecb', Buffer.from(ENCRYPTION_KEY), iv);
    // ruleid:node_aes_ecb
    let cipher = crypto.createCipheriv('aes-192-ecb', Buffer.from(ENCRYPTION_KEY), iv);
    // ruleid:node_aes_ecb
    let cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    // ruleid:node_aes_ecb
    let decipher = crypto.createDecipheriv('aes-128-ecb', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
}

// ruleid:node_insecure_random_generator
crypto.pseudoRandomBytes(1); // <Buffer 45>
//Math based random insecure
// ruleid:node_insecure_random_generator
const val = Math.random();

// ruleid:node_weak_crypto
var des = crypto.createCipher('des', key);

