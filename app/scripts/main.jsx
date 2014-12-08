let React = require('react');
let R = require('ramda');

let Header = React.createClass({
    render: function () {
        return (
            <header className="page-header">
                <h1 className="page-header-logo">shi.io</h1>
                <input className="page-header-search" type="search" />
            </header>
        );
    }
});

let Definitions = React.createClass({
    render: function () {
        let english = R.pipe(
            R.filter(R.where({ lang: 'en' })),
            R.head);

        let definitions =
            this.props.definitions
            .map(english)
            .map(definition =>
                <li className="definition-list-item">{definition.text}</li>
            );

        return (
            <ul className="definition-list">{definitions}</ul>
        );
    }
});

let SearchResults = React.createClass({
    render: function () {
        let results = this.props.searchResults.map(
            result => 
                <li key={result.id}
                    className="search-results-item">
                    <h2 className="search-results-headword">{result.headword}</h2>
                    <Definitions definitions={result.definitions} />
                </li>
        );

        return <ul className="search-results">{results}</ul>;
    }
});

let Page = React.createClass({
    render: function () {
        return (
          <div>
              <Header />
              <SearchResults searchResults={this.props.searchResults} />
          </div>
        );
    }
});

let searchResults = [
    {
        id: 1,
        headword: "苹果",
        definitions: [
            [ { lang: "en", text: "Apple" } ],
        ]
    },
    {
        id: 2,
        headword: "橙子",
        definitions: [
            [ { lang: "en", text: "Orange" } ],
        ]
    }
];

React.render(<Page searchResults={searchResults} />, document.body);