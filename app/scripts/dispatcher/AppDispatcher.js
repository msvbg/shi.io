let Dispatcher = require('flux').Dispatcher;
let assign = require('object-assign');

export default assign(new Dispatcher(), {

    handleViewAction: function (action) {
        this.dispatch({
            source: null,
            action: action
        });
    }

});
