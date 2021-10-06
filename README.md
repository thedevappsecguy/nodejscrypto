Fictional Characters : Alice and Bob

--> ECC - https://datatracker.ietf.org/doc/html/rfc6090


--> DH(Modular Exponential (MODP) Diffie-Hellman groups) - https://datatracker.ietf.org/doc/html/rfc3526


--> RSA - https://datatracker.ietf.org/doc/html/rfc8017

Optimal asymmetric encryption padding (OAEP) is the recommended padding scheme for RSA encryption and decryption.
The padding schemes for RSA digital signing and RSA public-key encryption are not the same. OAEP padding is recommended for RSA encryption; 
PSS padding is recommended for RSA digital signing.These two padding schemes are not interchangeable.

-->AES GCM : https://datatracker.ietf.org/doc/html/rfc5116

There are four inputs for authenticated encryption: the secret key, initialization vector (IV) (sometimes called a nonce†), the plaintext itself, and optional additional authentication data (AAD).The nonce and AAD are passed in the clear. There are two outputs: the ciphertext, which is exactly the same length as the plaintext, and an authentication tag (the "tag").The tag is sometimes called the message authentication code (MAC) or integrity check value (ICV).
https://nodejs.org/docs/latest-v16.x/api/crypto.html#crypto_decipher_setaad_buffer_options

NOTE: Take a look at http://safecurves.cr.yp.to/ before choosing a curve for your cryptography operations.


