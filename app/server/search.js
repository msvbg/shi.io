import keymirror from 'keymirror';
import chinese from './chinese';

export let QueryTypes = keymirror({
    CHINESE_TO_L1: null,
    L1_TO_CHINESE: null
});

/**
 * Determines if this is a Chinese-L1 query or L1-Chinese query.
 */
export function classifyQuery (query) {

    // If the search query contains any hanzi, treat it as a Chinese-L1 query
    for (let character of query) {
        if (chinese.isCJKCharacter(character)) {
            return QueryTypes.CHINESE_TO_L1;
        }
    }

    // Remove all non-alphabetic characters
    let filteredQuery = query.replace(/[^a-zA-Z]/g, '');

    // Tries to match all characters to pinyin syllables
    if (chinese.partitionPinyin(filteredQuery).length > 0) {
        return QueryTypes.CHINESE_TO_L1;
    }

    return QueryTypes.L1_TO_CHINESE;
}
