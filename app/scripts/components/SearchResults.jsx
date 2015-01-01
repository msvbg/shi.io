import React from 'react';
import Definitions from './Definitions.jsx';
import SearchResultStore from '../stores/SearchResultStore.js';

export default React.createClass({
    getInitialState: function () {
        return {
            searchResults: []
        };
    },
    componentDidMount: function () {
        SearchResultStore.addChangeListener(this._onChange);
    },
    render: function () {
        let results = this.state.searchResults.map(
            result => 
                <li key={result.id}
                    className="search-results-item">
                    <h2 className="search-results-headword">{result.headword}</h2>
                    <Definitions definitions={result.definitions} />
                </li>
        );

        return <ul className="search-results">{results}</ul>;
    },

    _onChange: function () {
        this.setState({
            searchResults: SearchResultStore.getSearchResults()
        });
    }
});

