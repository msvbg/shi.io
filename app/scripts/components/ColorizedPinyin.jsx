import React from 'react';
import chinese from '../../server/chinese.js';

export default React.createClass({
    render: function () {
        const syllables = this.props.pinyin.split(' ').map((s) => ({
            text: s,
            className: 'colorized-pinyin-syllable tone-' + chinese.getTone(s)
        }));

        const colorizedSyllables = syllables.map((s) =>
            <span className={s.className}>{s.text}</span>
        );

        return <span>{colorizedSyllables}</span>;
    }
});