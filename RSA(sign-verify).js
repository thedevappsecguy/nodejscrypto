const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    // length for RSA keys is 4096 bits
    modulusLength: 4096,
  });
const verifiableData = "to be verified";

//sign and then verify --> This proves the authenticity of the message 
const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
  key: privateKey,
  padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
});
// RSA - https://datatracker.ietf.org/doc/html/rfc8017 Optimal asymmetric encryption padding (OAEP) is the recommended padding scheme for RSA encryption and decryption. 
//The padding schemes for RSA digital signing and RSA public-key encryption are not the same. OAEP padding is recommended for RSA encryption; 
//PSS padding is recommended for RSA digital signing.These two padding schemes are not interchangeable.
console.log(signature.toString("base64"));


// To verify the data, we provide the same hashing algorithm and
// padding scheme along with signature
const isVerified = crypto.verify("sha256",Buffer.from(verifiableData),
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  },
  signature
);

// isVerified should be `true` if the signature is valid
console.log("signature verified: ", isVerified);
