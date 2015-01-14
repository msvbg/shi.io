import React from 'react';
import SearchResultStore from '../stores/search_result_store.js';
import Header from './header.jsx';
import SearchResults from './search_results.jsx';

export default React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <SearchResults />
            </div>
        );
    }
});
