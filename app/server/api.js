import pg from 'pg';
import pgHstoreFactory from 'pg-hstore';

const pgHstore = pgHstoreFactory();

const hstoreOid = 16507;
pg.types.setTypeParser(hstoreOid, (val) => pgHstore.parse(val));

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

export function search (query) {
    return queryDatabase(
        `SELECT
            id, headword_traditional AS headword, pinyin, definitions,
            ARRAY[1,2,3] AS arr, '"a"=>"b"'::hstore AS hs
        FROM entry
        WHERE pinyin LIKE '%' || $1 || '%'
        LIMIT 20`,
        [query])
    .then((result) =>
        result.rows.map((row) =>
            row))
}