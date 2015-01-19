import pg from 'pg';
import authentication from 'app/server/authentication.js';
import keymirror from 'keymirror';

const connectionString = 'postgres://martin:@localhost/shi_io';

function queryDatabase(query, parameters = []) {
    console.log('Querying', query);

    return new Promise(function (resolve, reject) {
        pg.connect(connectionString, function (error, client, done) {
            if (error) { reject(error); }

            client.query(query, parameters, function (error, result) {
                done();
                if (error) { reject(error); }

                resolve(result);
            });
        });
    });
}

export function search(query) {
    return queryDatabase(
        `SELECT
             id, headword_traditional AS headword, pinyin, definitions
         FROM entry
         WHERE pinyin LIKE '%' || $1 || '%'
         LIMIT 20`,
        [query])
    .then(result => result.rows);
}

export function authenticate(email, password) {
    return queryDatabase(
        `SELECT password_hash, password_salt
         FROM account
         WHERE $1 = account.email`,
         [email])
    .then(result => {
        if (result.rows.length === 0) {
            throw new Error("No matching email address.");
        }

        let { password_hash: hash,
              password_salt: salt } = result.rows[0];

        return authentication.validatePassword(password, hash, salt);
    });
}

export const ErrorTypes = keymirror({
    AUTHENTICATION_ERROR: null
});

export function success(data) {
    return data;
}

export function error(type, error) {
    return { type, message: error.message };
}