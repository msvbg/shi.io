import EventEmitter from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/app_dispatcher.js';
import Actions from '../constants/action_constants.js';
import request from 'superagent';
import debounce from 'debounce';
import keymirror from 'keymirror';

let entries = [];
let selectedEntry = null;
let query = "";

export const SearchResultEvents = keymirror({
    CHANGE_SEARCH_RESULTS: null,
    CHANGE_VIEWED_SEARCH_RESULT: null
});

export let SearchResultStore = assign({}, EventEmitter.prototype, {
    getSearchResults: function () {
        return entries;
    }
});

// Debounce search requests so as to not needlessly spam server
const searchDebounceDelay = 0;
const debouncedSearch = debounce(function (query) {
    request
        .get('/api/search?query=' + query)
        .end(function (error, response) {
            entries = response.body.map(function (x, n) {
                return {
                    id: n,
                    headword: x.headword,
                    pinyin: x.pinyin,
                    definitions: x.definitions,
                    sentences: x.sentences
                };
            });
            SearchResultStore.emit(SearchResultEvents.SEARCH_RESULTS_CHANGED);
        });
}, searchDebounceDelay);

AppDispatcher.register(function (payload) {
    switch (payload.action.type) {
    case Actions.SEARCH:
        query = payload.action.query;
        debouncedSearch(query);
        break;

    case Actions.CHANGE_VIEWED_SEARCH_RESULT:
        SearchResultStore.emit(SearchResultEvents.VIEWED_SEARCH_RESULT_CHANGED);
        break;
    }

    return true;
});

export default SearchResultStore;