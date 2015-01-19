jest.autoMockOff();

import 'react/addons';
import LoginSwitch from 'app/components/login_switch.jsx';
import React from 'react';

let TestUtils = React.addons.TestUtils;

describe('LoginSwitch', function() {
    it('renders a component with a single numbered pinyin syllable', function() {
        const component = TestUtils.renderIntoDocument(
            <ColorizedPinyin pinyin="ping2" />
        );

        const spans = TestUtils.scryRenderedDOMComponentsWithClass(
            component, "colorized-pinyin-syllable"
        );

        expect(spans[0].getDOMNode().className).toMatch(/tone-2/);
        expect(spans[0].getDOMNode().textContent).toEqual('píng');
    });
});