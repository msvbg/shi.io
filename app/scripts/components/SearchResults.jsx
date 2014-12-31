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

