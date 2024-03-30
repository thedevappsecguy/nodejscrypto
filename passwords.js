const crypto = require('crypto');
const bcrypt = require('bcrypt');
const argon2 = require('argon2');


// Hash and verify using PBKDF2
function hashAndVerifyPBKDF2(password) {
    // Generate salt
    const salt = crypto.randomBytes(16);
    const iterations = 10000; // Number of iterations
    const keyLength = 32; // Desired key length (in bytes)
    const hashAlgorithm = 'sha256'; // Hash algorithm

    // Hash the password
    crypto.pbkdf2(password, salt, iterations, keyLength, hashAlgorithm, (err, derivedKey) => {
        if (err) {
            console.error('Error during hashing:', err);
        } else {
            console.log('Hashed Password (PBKDF2):', derivedKey.toString('hex'));

            // Verify the password
            crypto.pbkdf2(password, salt, iterations, keyLength, hashAlgorithm, (err, newDerivedKey) => {
                if (err) {
                    console.error('Error during verification:', err);
                } else {
                    const match = derivedKey.equals(newDerivedKey);
                    console.log('Password verification (PBKDF2):', match ? 'Success' : 'Failure');
                }
            });
        }
    });
}

// Example usage
hashAndVerifyPBKDF2('mySecurePassword123');


// Hash and verify using bcrypt
function hashAndVerifyBcrypt(password) {
    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error during hashing:', err);
        } else {
            console.log('Hashed Password (bcrypt):', hashedPassword);

            // Verify the password
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    console.error('Error during verification:', err);
                } else {
                    console.log('Password verification (bcrypt):', result ? 'Success' : 'Failure');
                }
            });
        }
    });
}

// Example usage
hashAndVerifyBcrypt('mySecurePassword123');


// Hash and verify using Argon2d
async function hashAndVerifyArgon2d(password) {
    try {
        // Hash the password
        const hashedPassword = await argon2.hash(password, { type: argon2.argon2d });

        console.log('Hashed Password (Argon2d):', hashedPassword);

        // Verify the password
        const match = await argon2.verify(hashedPassword, password);
        console.log('Password verification (Argon2d):', match ? 'Success' : 'Failure');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Example usage
hashAndVerifyArgon2d('mySecurePassword123');


// Hash and verify using Argon2i
async function hashAndVerifyArgon2i(password) {
    try {
        // Hash the password
        const hashedPassword = await argon2.hash(password, { type: argon2.argon2i });

        console.log('Hashed Password (Argon2i):', hashedPassword);

        // Verify the password
        const match = await argon2.verify(hashedPassword, password);
        console.log('Password verification (Argon2i):', match ? 'Success' : 'Failure');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Example usage
hashAndVerifyArgon2i('mySecurePassword123');


// Hash and verify using Argon2id
async function hashAndVerifyArgon2id(password) {
    try {
        // Hash the password
        const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

        console.log('Hashed Password (Argon2id):', hashedPassword);

        // Verify the password
        const match = await argon2.verify(hashedPassword, password);
        console.log('Password verification (Argon2id):', match ? 'Success' : 'Failure');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Example usage
hashAndVerifyArgon2id('mySecurePassword123');
