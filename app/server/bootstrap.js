var System = require('es6-module-loader').System;

System.import('main').then(function (main) {
    main.run(__dirname);
}).catch(function (error){
    console.log(error);
});
