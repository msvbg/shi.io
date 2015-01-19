import React from 'react';
import R from 'ramda';

export default React.createClass({
    render: function () {
        let english = R.pluck('en');

        let definitions =
            english(this.props.definitions)
            .map((definition, index) =>
                <li className="definition-list-item"
                    key={index}>{definition}</li>
            );

        return (
            <ol className="definition-list">{definitions}</ol>
        );
    }
});