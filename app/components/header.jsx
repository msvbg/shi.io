import React from 'react';
import Actions from 'app/actions/actions.js';
import LoginSwitch from 'app/components/login_switch.jsx';
import {default as Router, Navigation} from 'react-router';
import debounce from 'debounce';

export default React.createClass({
    mixins: [Navigation, Router.State],
    propTypes: {
        expanded: React.PropTypes.bool.isRequired
    },
    getInitialState: function () {
        const queryParams = this.getQuery();
        return {
            query: queryParams.query
        };
    },
    componentDidMount: function () {
        Actions.search(this.state.query);
    },
    render: function () {
        const isHome = this.isActive("home");

        const className = React.addons.classSet({
            'page-header': true,
            'expanded': this.props.expanded,
            'not-expanded': !this.props.expanded
        });

        const logoClass = React.addons.classSet({
            'page-header-logo': true,
            'expanded': !isHome,
            'not-expanded': isHome
        });

        return (
            <header className={className}>
                <div className={logoClass}>
                    <a href="#/"><img src="assets/images/shi.svg" /></a>
                </div>
                <div className="page-header-search-bar">
                    <div className="page-header-looking-glass" />
                    <input
                        className="page-header-search"
                        type="search"
                        onChange={this._onType}
                        onKeyUp={this._onSearch}
                        value={this.state.query}
                        placeholder="shi1 zi, 狮子, lion…"
                        autoFocus />
                    {this.props.expanded ? <LoginSwitch /> : null}
                </div>
            </header>
        );
    },

    _onType: function (event) {
        const query = event.target.value;
        this.setState({ query: query });
    },

    _onSearch: function (event) {
        if (event.keyCode === 13) {
            Actions.search(this.state.query);
            this.transitionTo(`/search?query=${this.state.query}`);
        }
    },

    _changeSearchRoute: function () {
    }
});