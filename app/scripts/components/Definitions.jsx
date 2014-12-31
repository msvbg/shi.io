let Definitions = React.createClass({
    render: function () {
        let english = R.pipe(
            R.filter(R.where({ lang: 'en' })),
            R.head);

        let definitions =
            this.props.definitions
            .map(english)
            .map(definition =>
                <li className="definition-list-item"
                    key={definition.index}>{definition.text}</li>
            );

        return (
            <ul className="definition-list">{definitions}</ul>
        );
    }
});