let React = require('react');

import EntryStore from '../stores/EntryStore.js';
import Header from './Header.jsx';

export default React.createClass({
    render: function () {
        return (
            <div>
                <Header />
            </div>
        );
    }
});
              //<SearchResults searchResults={this.props.searchResults} />
