const crypto = require("crypto");


const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // length for RSA keys is 4096 bits
  modulusLength: 4096,
});

console.log(
	publicKey.export({
		type: "pkcs1",
		format: "pem",
	}),

  
	privateKey.export({
		type: "pkcs1",
		format: "pem",
        cipher: 'aes-256-cbc',
        passphrase: 'top secret'
        
	})
)
//https://datatracker.ietf.org/doc/html/rfc8017

// RSA - https://datatracker.ietf.org/doc/html/rfc8017 Optimal asymmetric encryption padding (OAEP) is the recommended padding scheme for RSA encryption and decryption. 
//The padding schemes for RSA digital signing and RSA public-key encryption are not the same. OAEP padding is recommended for RSA encryption; 
//PSS padding is recommended for RSA digital signing.These two padding schemes are not interchangeable.
const data = "my secret sauce data";

const encryptedData = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  // We convert the data string to a buffer using `Buffer.from`
  Buffer.from(data)
);

// The encrypted data is in the form of bytes, so we print it in base64 format
// so that it's displayed in a more readable form
console.log("encypted data: ", encryptedData.toString("base64"));

//Decrypts buffer with privateKey. buffer was previously encrypted using the corresponding public key,  using publicEncrypt.
const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedData
  );
  
  // The decrypted data is of the Buffer type, which we can convert to a
  // string to reveal the original data
  console.log("decrypted data: ", decryptedData.toString());
