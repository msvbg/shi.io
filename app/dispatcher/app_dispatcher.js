import Flux from 'flux';
import assign from 'object-assign';

export default assign(new Flux.Dispatcher(), {

    handleViewAction: function (action) {
        this.dispatch({
            source: null,
            action: action
        });
    }

});
