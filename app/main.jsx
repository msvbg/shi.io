import "babel/polyfill";
import React from 'react';
import Router from 'react-router';
import routes from 'app/config/routes.jsx';

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});