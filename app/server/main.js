import {search} from './api';
import express from 'express';
import compression from 'compression';

let app = express();

app.use(express.static(__dirname + '/../../public'));
app.use(compression());

app.get('/api/search', function (req, res) {
    let searchQuery = req.query.query;
    
    search(searchQuery)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (error) {
            console.error(error);
        });
});

let server = app.listen(1534, function () {
    console.log('Listening on 1534');
});
