let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import Actions from '../constants/ActionConstants.js';

let _entries = {};

let CHANGE_EVENT = 1;

let EntryStore = assign({}, EventEmitter.prototype, {

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
  console.log(payload);

  EntryStore.emitChange();

  return true;
});

export default EntryStore;