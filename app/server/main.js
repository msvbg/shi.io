import api from 'app/server/api';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

let app = express();

app.use(express.static(__dirname + '/../../public'));
app.use(compression());
app.use(bodyParser.json());

app.get('/api/search', function (req, res) {
    let searchQuery = req.query.query;
    
    api.search(searchQuery)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.post('/api/authenticate', function (req, res) {
    let email = req.body.email,
        password = req.body.password;

    api.authenticate(email, password)
        .then((result) => res.json({ valid: true }))
        .catch((result) => res.json({ valid: false }));
});

let server = app.listen(1534, function () {
    console.log('Listening on 1534');
});
