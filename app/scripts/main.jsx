let React = require('react');
let R = require('ramda');

import App from './components/App.jsx';

let searchResults = [
    {
        id: 1,
        headword: "苹果",
        definitions: [
            [ { index: 1, lang: "en", text: "Apple" } ],
        ]
    },
    {
        id: 2,
        headword: "橙子",
        definitions: [
            [ { index: 1, lang: "en", text: "Orange" } ],
        ]
    }
];

React.render(
    <App />,
    document.body
);