var System = require('es6-module-loader').System;

System.import('./app/server/main').then(function (main) {
    main.run(__dirname);
}).catch(function (err){
    console.log('err', err);
});
