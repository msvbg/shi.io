import {search} from 'api';

export function run (appdir) {
    let express = require('express');
    let compression = require('compression');
    let app = express();

    app.use(express.static(appdir + '/../../public'));
    app.use(compression());

    app.get('/api/search', function (req, res) {
        let searchQuery = req.query['query'];
        res.sendStatus(search(searchQuery));
    });

    let server = app.listen(1534, function () {
        console.log('Listening on 1534');
    });
}
