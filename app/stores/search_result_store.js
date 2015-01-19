import EventEmitter from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/app_dispatcher.js';
import Actions from '../constants/action_constants.js';
import request from 'superagent';
import debounce from 'debounce';

let entries = [];
let query = "";

let CHANGE_EVENT = 1;

let SearchResultStore = assign({}, EventEmitter.prototype, {
    getSearchResults: function () {
        return entries;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Debounce search requests so as to not needlessly spam server
const searchDebounceDelay = 200;
const debouncedSearch = debounce(function (query) {
    request
        .get('/api/search?query=' + query)
        .end(function (error, response) {
            entries = response.body.map(function (x, n) {
                return {
                    id: n,
                    headword: x.headword,
                    pinyin: x.pinyin,
                    definitions: [{ index: 1, lang: "en", text: x.definitions }]
                };
            });
            SearchResultStore.emitChange();
        });
}, searchDebounceDelay);

AppDispatcher.register(function (payload) {
    query = payload.action.query;
    debouncedSearch(query);

    return true;
});

export default SearchResultStore;