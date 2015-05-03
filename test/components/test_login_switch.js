import mockSuperagent from '../mocks/mock_superagent.js';
jest.setMock('superagent', mockSuperagent);

import 'react/addons';
import LoginSwitch from 'app/components/login_switch.jsx';
import React from 'react';
import request from 'superagent';

let TestUtils = React.addons.TestUtils;

describe('LoginSwitch', function() {
    it('sends a request to the backend when logging in', function () {
        let loginSwitch = TestUtils.renderIntoDocument(<LoginSwitch />);
        let loginButton = TestUtils.findRenderedDOMComponentWithTag(
            loginSwitch, 'button');

        expect(request.post.mock.calls)
            .toEqual([]);

        TestUtils.Simulate.click(loginButton);

        expect(request.post.mock.calls[0][0])
            .toEqual('/api/authenticate')
    });

    it('changes the button text when logging out', function () {
        let loginSwitch = TestUtils.renderIntoDocument(<LoginSwitch />);
        let logoutButton = TestUtils.findRenderedDOMComponentWithTag(
            loginSwitch,
            'button');
        loginSwitch.setState({ loggedIn: true });

        expect(logoutButton.getDOMNode().textContent)
            .toEqual("Log out");

        TestUtils.Simulate.click(logoutButton);

        expect(logoutButton.getDOMNode().textContent)
            .toEqual("Log in");
    });
});