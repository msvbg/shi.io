import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ActionConstants from '../constants/ActionConstants.js';

export default {
    search: function (query) {
        AppDispatcher.handleViewAction({
            action: ActionConstants.SEARCH,
            query: query
        });
    }
};