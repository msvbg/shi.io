import React from 'react';
import R from 'ramda';
import Definitions from 'app/components/definitions.jsx';
import {SearchResultStore, SearchResultEvents} from 'app/stores/search_result_store.js';
import ColorizedPinyin from 'app/components/colorized_pinyin.jsx';
import {MediaSwitch, MediaCase} from 'react-mediaswitch';
import EntryView from 'app/components/entry_view.jsx';
import debounce from 'debounce';

export default React.createClass({
    getInitialState: function () {
        return {
            searchResults: SearchResultStore.getSearchResults(),
            selected: {}
        };
    },
    componentDidMount: function () {
        SearchResultStore.on(
            SearchResultEvents.VIEWED_SEARCH_RESULT_CHANGED,
            this._onChange);

        // Make the entry view sticky upon scroll
        window.onscroll = this._updateEntryViewPosition;
    },
    componentWillUnmount: function () {
        SearchResultStore.removeListener(
            SearchResultEvents.VIEWED_SEARCH_RESULT_CHANGED,
            this._onChange);
    },
    componentDidUpdate: function() {
        this._updateEntryViewPosition();
    },
    render: function () {
        if (this.state.searchResults.length === 0) {
            return null;
        }

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
        const searchResultsContainer = (ignore, x) =>
            <div className="search-results-container">{x}</div>;

        return (
            <MediaSwitch component={searchResultsContainer}>
                <MediaCase media="(max-width: 1024px)">
                    <ul className="search-results">{results}</ul>
                </MediaCase>
                <MediaCase media="(min-width: 1024px)">
                    <ul className="search-results side">{results}</ul>
                    <EntryView
                        ref="entryView"
                        entry={this.state.selected} />
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
    },

    _updateEntryViewPosition: function () {
        const selected = $(".search-results-item.selected");
        let tabView = $(".entry-view");

        if (!selected.length || !tabView.length) { return; }

        const tabViewY = tabView.offset().top,
              scrollY = window.scrollY,
              parentY = selected.parent().offset().top,
              selectedY = selected.offset().top,
              selectedRelY = selectedY - parentY;

        if (scrollY < selectedY) {
            if (tabViewY <= selectedY) {
                if (scrollY < parentY) {
                    tabView.css("position", "static");
                } else {
                    tabView.css("position", "fixed");
                    tabView.css("top", 0);
                }
            }
        } else {
            tabView.css("position", "absolute");
            tabView.css("top", selectedRelY);
        }
    }
});

