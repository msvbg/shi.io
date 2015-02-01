import React from 'react';
import {TabView, TabPanel} from 'app/components/tab_view.jsx';

export default React.createClass({
    propTypes: {
        entry: React.PropTypes.object
    },
    render: function () {
        if (!this.props.entry) {
            return null;
        }

        const definitions = (entry) => {
            if (!entry.definitions) {
                return null;
            } else {
                return entry.definitions.map((x, i) =>
                    <li key={i} className="entry-view-definition-list-item">{x}</li>
                );
            }
        }(this.props.entry);

        return (
            <div className="entry-view">
                <TabView>
                    <TabPanel label="General">
                        <h1 className="entry-view-headword">{this.props.entry.headword}</h1>
                        <ol className="entry-view-definition-list">{definitions}</ol>
                    </TabPanel>
                    <TabPanel label="Characters">
                        <h2>Hello from Bar</h2>
                    </TabPanel>
                    <TabPanel label="History">
                        <h2>Hello from Baz</h2>
                    </TabPanel>
                </TabView>
            </div>
        );
    }
});