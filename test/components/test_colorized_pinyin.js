import 'react/addons';
import ColorizedPinyin from 'app/components/colorized_pinyin.jsx';
import React from 'react';

let TestUtils = React.addons.TestUtils;


describe('ColorizedPinyin', function() {
    it('renders nothing on empty input', function () {
        const component = TestUtils.renderIntoDocument(
            <ColorizedPinyin pinyin="" />
        );

        const spans = TestUtils.scryRenderedDOMComponentsWithClass(
            component, "colorized-pinyin-syllable"
        );

        expect(spans).toEqual([]);
    });

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

    it('renders a component with multiple numbered pinyin syllables', function () {
        const component = TestUtils.renderIntoDocument(
            <ColorizedPinyin pinyin="you2 tiao2" />
        );

        const spans = TestUtils.scryRenderedDOMComponentsWithClass(
            component, "colorized-pinyin-syllable"
        );

        let one = spans[0].getDOMNode(),
            two = spans[1].getDOMNode();

        expect(one.className).toMatch(/tone-2/);
        expect(two.className).toMatch(/tone-2/);
        expect(one.textContent).toMatch('yóu');
        expect(two.textContent).toMatch('tiáo');

    });
});