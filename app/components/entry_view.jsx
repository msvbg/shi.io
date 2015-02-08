import React from 'react';
import {TabView, TabPanel} from 'app/components/tab_view.jsx';
import ColorizedPinyin from 'app/components/colorized_pinyin.jsx';

export default React.createClass({
    propTypes: {
        entry: React.PropTypes.object
    },
    render: function () {
        if (!this.props.entry) {
            return null;
        }

        let definitions = (definitions) => {
            if (!definitions) {
                return null;
            } else {
                return definitions.map((x, i) =>
                    <li key={i} className="entry-view-definition">{x}</li>
                );
            }
        }(this.props.entry.definitions);

        let sentences = (sentences) => {
            if (!sentences) {
                return null;
            } else {
                return sentences.map((x, i) =>
                    <li key={i} className="entry-view-sentence">
                        <div className="traditional">{x.traditional}</div>
                        <div className="pronunciation"><ColorizedPinyin pinyin={x.pinyin} /></div>
                        <div className="translation">{x.translation.en}</div>
                    </li>
                );
            }
        }(this.props.entry.sentences);

        let characters = (characters) => {
            return Array.from(characters).map((x, i) =>
                <li className="entry-view-character">{x}</li>);
        }(this.props.entry.headword);

        let generalView =
            <TabPanel label="General">
                <header className="entry-view-header">
                    <a href="#">
                        <h1 className="entry-view-headword">
                            {this.props.entry.headword}
                        </h1>
                    </a>
                    <ColorizedPinyin pinyin={this.props.entry.pinyin} />
                </header>

                <h2 className="header-1">Definitions</h2>
                <ol className="entry-view-definitions">{definitions}</ol>

                <h2 className="header-1">Example sentences</h2>
                <ol className="entry-view-sentences">{sentences}</ol>
            </TabPanel>;

        let characterView =
            <TabPanel label="Characters">
                <ol className="entry-view-characters">{characters}</ol>
            </TabPanel>;

        let historyView =
            <TabPanel label="History">
                <h2>Hello from Baz</h2>
            </TabPanel>;

        return (
            <div className="entry-view">
                <button className="entry-view-edit-button">Edit</button>
                <TabView>
                    {generalView}                    
                    {characterView}
                    {historyView}
                </TabView>
            </div>
        );
    }
});