import React from 'react';
import SearchResultStore from 'app/stores/search_result_store.js';
import Header from 'app/components/header.jsx';
import SearchResults from 'app//components/search_results.jsx';

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
