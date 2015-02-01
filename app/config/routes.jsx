import React from 'react';
import Router from 'react-router';
import App from 'app/components/app.jsx';
import Home from 'app/components/home.jsx';
import Search from 'app/components/search.jsx';

const Route = Router.Route,
      DefaultRoute = Router.DefaultRoute;

export default (
    <Route name="app" path="/" handler={App}>
        <Route name="search" handler={Search} />
        <DefaultRoute name="home" handler={Home} />
    </Route>
);