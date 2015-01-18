import AppDispatcher from '../dispatcher/app_dispatcher.js';
import ActionConstants from '../constants/action_constants.js';

export default {
    search: function (query) {
        AppDispatcher.handleViewAction({
            action: ActionConstants.SEARCH,
            query: query
        });
    }
};