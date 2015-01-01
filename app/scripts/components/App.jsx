import React from 'react';
import SearchResultStore from '../stores/SearchResultStore.js';
import Header from './Header.jsx';
import SearchResults from './SearchResults.jsx';

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
