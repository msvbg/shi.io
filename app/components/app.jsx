import React from 'react';
import {default as Router, RouteHandler} from 'react-router';
import SearchResultStore from 'app/stores/search_result_store.js';
import Header from 'app/components/header.jsx';
import SearchResults from 'app/components/search_results.jsx';

export default React.createClass({
    mixins: [Router.State],
    render: function () {
        const isHome = this.isActive("home");

        const appContainerClass = React.addons.classSet({
            'app-container': true,
            'centered': isHome,
            'not-centered': !isHome
        });

        const logoClass = React.addons.classSet({
            'page-header-logo': true,
            'visible': isHome,
            'not-visible': !isHome
        });

        return (
            <div className="page-container">
                <img src="assets/images/shi.svg" className={logoClass} />
                <div className={appContainerClass}>
                    <Header expanded={!isHome} />
                    <RouteHandler />
                </div>
            </div>
        );
    }
});
