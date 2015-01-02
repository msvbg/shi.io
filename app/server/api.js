import pg from 'pg';

let connectionString = 'postgres://martin:@localhost/shi_io';

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

export function search (query) {
    return queryDatabase(
        `SELECT
            headword
        FROM entry
        WHERE headword LIKE %$1%`,
        [query])
    .then((result) => result.rows);
}