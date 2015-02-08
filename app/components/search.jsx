import React from 'react';
import {RouteHandler} from 'react-router';
import Header from 'app/components/header.jsx';
import SearchResults from 'app/components/search_results.jsx';
import velocity from 'velocity-animate';

export default React.createClass({
    render: function () {
        return <SearchResults />;
    }
});
