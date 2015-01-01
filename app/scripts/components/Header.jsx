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
                    onChange={this.onSearch}
                    value={this.state.query}
                    autoFocus />
            </header>
        );
    },
    onSearch: function (event) {
        let query = event.target.value;

        this.setState({ query: query });
        Actions.search(query);
    }
});