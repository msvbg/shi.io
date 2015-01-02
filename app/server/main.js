import {search} from './api';
import express from 'express';
import compression from 'compression';

let app = express();

app.use(express.static(__dirname + '/../../public'));
app.use(compression());

    app.get('/api/search', function (req, res) {
        let searchQuery = req.query['query'];
        res.sendStatus(search(searchQuery));
    });

let server = app.listen(1534, function () {
    console.log('Listening on 1534');
});
