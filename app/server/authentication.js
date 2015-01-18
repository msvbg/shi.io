import crypto from 'crypto';

const iterations = 10000,
      keyLength = 32;

export function validatePassword(password, hash, salt) {
    return new Promise(function (fulfill, reject) {
        crypto.pbkdf2(
                password,
                salt,
                iterations,
                keyLength,
                function (error, encoded) {

            let valid = (encoded.toString('base64') === hash);

            if (valid) {
                fulfill();
            } else {
                reject();
            }
        });
    });
}