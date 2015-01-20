import React from 'react';
import R from 'ramda';
import Definitions from 'app/components/definitions.jsx';
import SearchResultStore from 'app/stores/search_result_store.js';
import ColorizedPinyin from 'app/components/colorized_pinyin.jsx';
import {MediaSwitch, MediaCase} from 'react-mediaswitch';
import EntryView from 'app/components/entry_view.jsx';

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
        let results = this.state.searchResults.map((result) => {
            const isSelected = (result === this.state.selected);

            const className = React.addons.classSet({
                'search-results-item': true,
                'selected': isSelected
            });

            return ( 
                <li key={result.id}
                    className={className}
                    onClick={this._onClickSearchResult.bind(null, result)}>
                    <div className="search-results-item-header">
                        <h2 className="search-results-item-headword">{result.headword}</h2>
                        <span className="search-results-item-pronunciation">
                            <ColorizedPinyin pinyin={result.pinyin} />
                        </span>
                    </div>
                    <div className="search-results-item-content">
                        <Definitions definitions={result.definitions} />
                    </div>
                </li>
            );
        });

        const layoutBreakpoint = 800;

        window.onresize = () => this.setState(this.state);

        return (
            <MediaSwitch>
                <MediaCase media="(max-width: 1024px)">
                    <ul className="search-results">{results}</ul>
                </MediaCase>
                <MediaCase media="(min-width: 1024px)">
                    <ul className="search-results side">{results}</ul>
                    <EntryView entry={this.state.selected}/>
                </MediaCase>
            </MediaSwitch>
        );
    },

    _onChange: function () {
        const searchResults = SearchResultStore.getSearchResults();
        this.setState({
            searchResults: searchResults,
            selected: R.head(searchResults)
        });
    },

    _onClickSearchResult: function (result) {
        this.setState({
           selected: result
        });
    }
});

