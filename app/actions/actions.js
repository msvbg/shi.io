import AppDispatcher from '../dispatcher/app_dispatcher.js';
import ActionConstants from '../constants/action_constants.js';

export default {
    search: function (query) {
        AppDispatcher.handleViewAction({
            type: ActionConstants.SEARCH,
            query: query
        });
    },

    changeViewedSearchResult: function (searchResult) {
        AppDispatcher.handleViewAction({
            type: ActionConstants.CHANGE_VIEWED_SEARCH_RESULT,
            searchResult: searchResult
        });
    }
};