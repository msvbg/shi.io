import React from 'react';
import Actions from 'app/actions/actions.js';
import request from 'superagent';

export default React.createClass({
    getInitialState: function () {
        return { loggedIn: false };
    },
    render: function () {
        let loginLink = ((loggedIn) => {
            if (loggedIn) {
                return <button
                    className="login-switch-link"
                    onClick={this._onClickLogOut}>Log out</button>;
            } else {
                return <button
                    className="login-switch-link"
                    onClick={this._onClickLogIn}>Log in</button>;
            }
        })(this.state.loggedIn);

        return <div className="login-switch">{loginLink}</div>;
    },

    _onClickLogIn: function (event) {
        request
            .post('/api/authenticate')
            .send({ email: 'martin@martinsvanberg.com', password: 'null' })
            .end((error, res) => res);
    },

    _onClickLogOut: function (event) {
        this.setState({ loggedIn: false });
    }
});