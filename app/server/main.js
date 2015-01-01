export function run (appdir) {
    let express = require('express');
    let app = express();

    app.use(express.static(appdir + '/../../public'));

    let server = app.listen(1534, function () {
        console.log('Listening on 1534');
    });
}
