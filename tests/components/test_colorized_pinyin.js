jest.autoMockOff();

import 'react/addons';
import ColorizedPinyin from 'app/scripts/components/colorized_pinyin.jsx';
import React from 'react';

let TestUtils = React.addons.TestUtils;


describe('ColorizedPinyin', function() {
    it('renders a component with a single numbered pinyin syllable', function() {
        const component = TestUtils.renderIntoDocument(
            <ColorizedPinyin pinyin="ping2" />
        );

        const span = TestUtils.scryRenderedDOMComponentsWithClass(
            component, "colorized-pinyin-syllable"
        );

        expect(span[0].getDOMNode().className).toMatch(/tone-2/);
        expect(span[0].getDOMNode().textContent).toEqual('ping2');
    });

    it('renders a component with multiple numbered pinyin syllables', function () {
        const component = TestUtils.renderIntoDocument(
            <ColorizedPinyin pinyin="han4 zi5" />
        );

        const spans = TestUtils.scryRenderedDOMComponentsWithClass(
            component, "colorized-pinyin-syllable"
        );

        expect(spans[0].getDOMNode().className).toMatch(/tone-4/);
        expect(spans[1].getDOMNode().className).toMatch(/tone-5/);

    });
});