import React from 'react';
import chinese from 'app/common/chinese.js';

export default React.createClass({
    render: function () {
        if (!this.props.pinyin) {
            return <span></span>;
        }

        const syllables = this.props.pinyin.split(' ')
            .map((text, index) => ({
                index,
                text: chinese.numberedSyllableToDiacritic(text),
                className: 'colorized-pinyin-syllable tone-' + chinese.getTone(text)
            })
        );

        const colorizedSyllables = syllables.map((s) =>
            <span key={s.index} className={s.className}>{s.text}</span>
        );

        return <span>{colorizedSyllables}</span>;
    }
});