import React from 'react';
import {TabView, TabPanel} from 'app/components/tab_view.jsx';

export default React.createClass({
    render: function () {
        const entry = this.props.entry || {};

        return (
            <div className="entry-view">
                <TabView>
                    <TabPanel label="General">
                        <h1 className="entry-view-headword">{entry.headword}</h1>
                        <p>{entry.definitions}</p>
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