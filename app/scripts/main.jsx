let React = require('react.js');

let Header = React.createClass({
    render: function () {
        return <header className="page-header">
                  <h1 className="page-header-logo">shi.io</h1>
                  <input className="page-header-search" type="search" />
               </header>;
    }
});

let SearchResults = React.createClass({
    render: function () {
        let results = this.props.searchResults.map(
            result => <li key={result.id}>{result.headword}</li>
        );

        return <ul>{results}</ul>;
    }
});

let Page = React.createClass({
    render: function () {
        return <div>
                   <Header />
                   <SearchResults searchResults={this.props.searchResults} />
               </div>;
    }
});

let searchResults = [
    { id: 1, headword: "Apple" },
    { id: 2, headword: "Orange" }
];

React.render(<Page searchResults={searchResults} />, document.body);