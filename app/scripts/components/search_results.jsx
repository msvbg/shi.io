import React from 'react';
import Definitions from './definitions.jsx';
import SearchResultStore from '../stores/search_result_store.js';

export default React.createClass({
    getInitialState: function () {
        return {
            searchResults: SearchResultStore.getSearchResults()
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
                    <h2 className="search-results-item-headword">{result.headword}</h2>
                    <div className="search-results-item-content">
                        <Definitions definitions={result.definitions} />
                    </div>
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

