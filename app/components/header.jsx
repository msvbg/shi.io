import React from 'react';
import Actions from 'app/actions/actions.js';
import LoginSwitch from 'app/components/login_switch.jsx';

export default React.createClass({
    getInitialState: function () {
        return {
            query: "fang"
        };
    },
    componentDidMount: function () {
        Actions.search(this.state.query);
    },
    render: function () {
        return (
            <header className="page-header">
                <div className="page-header-looking-glass" />
                <input
                    className="page-header-search"
                    type="search"
                    onChange={this._onSearch}
                    value={this.state.query}
                    placeholder="shi1 zi, 狮子, lion…"
                    autoFocus />
                <LoginSwitch />
            </header>
        );
    },

    _onSearch: function (event) {
        let query = event.target.value;

        this.setState({ query: query });
        Actions.search(query);
    }
});