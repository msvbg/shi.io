import React from 'react';
import SearchResultStore from 'app/scripts/stores/search_result_store.js';
import Header from 'app/scripts/components/header.jsx';
import SearchResults from 'app/scripts/components/search_results.jsx';

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
