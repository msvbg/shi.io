jest.autoMockOff();

import 'react/addons';
import EntryView from 'app/components/entry_view.jsx';
import React from 'react';

let TestUtils = React.addons.TestUtils;

describe('EntryView', function() {
    let entry = {
        headword: 'headword',
        definitions: [
            "Definition 1",
            "Definition 2"
        ],
        sentences: [
            {
                translation: { "en": "I am a unicorn." }
            },
            {
                translation: { "en": "I am a dinosaur." }
            }
        ]
    };

    let elements = {};
    let DOMNode = (element) => elements[element].getDOMNode();

    beforeEach(() => {
        let entryView = TestUtils.renderIntoDocument(
            <EntryView entry={entry} />);

        elements.headword = TestUtils.findRenderedDOMComponentWithClass(
            entryView, 'entry-view-headword');
        elements.definitions = TestUtils.findRenderedDOMComponentWithClass(
            entryView, 'entry-view-definitions');
        elements.sentences = TestUtils.findRenderedDOMComponentWithClass(
            entryView, 'entry-view-sentences');
    });

    it('shows the entry headword', function () {
        expect(DOMNode('headword').textContent)
            .toBe(entry.headword);
    });

    it('shows a definition list', function () {
        expect(Object.keys(DOMNode('definitions').children).length)
            .toBe(entry.definitions.length);
    });

    it('shows a list of example sentences', function () {
        expect(Object.keys(DOMNode('sentences').children).length)
            .toBe(entry.sentences.length);
    });
});