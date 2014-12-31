let React = require('react');

import Actions from '../actions/Actions.js';

export default React.createClass({
    getInitialState: function () {
        return {
            query: "Search query"
        };
    },
    render: function () {
        return (
            <header className="page-header">
                <h1 className="page-header-logo">shi.io</h1>
                <input
                    className="page-header-search"
                    type="search"
                    onChange={this.search}
                    value={this.state.query} />
            </header>
        );
    },
    search: function (event) {
        this.setState({ query: event.target.value });
        Actions.search(this.state.query);
    }
});