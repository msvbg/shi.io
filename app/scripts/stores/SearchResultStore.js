import EventEmitter from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import Actions from '../constants/ActionConstants.js';

let entries = [
    {
        id: 1,
        headword: "苹果",
        definitions: [
            [ { index: 1, lang: "en", text: "Apple" } ],
        ]
    },
    {
        id: 2,
        headword: "橙子",
        definitions: [
            [ { index: 1, lang: "en", text: "Orange" } ],
        ]
    }
];

let query = "";

let CHANGE_EVENT = 1;

let SearchResultStore = assign({}, EventEmitter.prototype, {

  getSearchResults: function () {
    if (query === "Hi") {
        return entries;
    } else {
        return entries;
    }
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

AppDispatcher.register(function (payload) {
  query = payload.action.query;

  SearchResultStore.emitChange();

  return true;
});

export default SearchResultStore;