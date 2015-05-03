import React from 'react';
import {default as Router, RouteHandler} from 'react-router';
import SearchResultStore from 'app/stores/search_result_store.js';
import Header from 'app/components/header.jsx';
import SearchResults from 'app/components/search_results.jsx';

export default React.createClass({
    mixins: [Router.State],
    render: function () {
        const isHome = this.isActive("home");

        const backgroundCoverClass = React.addons.classSet({
            'background-cover': true,
            'centered': isHome,
            'not-centered': !isHome
        });

        const appContainerClass = React.addons.classSet({
            'app-container': true,
            'expanded': !isHome,
        });

        return (
            <div className="page-container">
                <div className={appContainerClass}>
                    <Header expanded={!isHome} />
                    <RouteHandler />
                </div>
            </div>
        );
    }
});
