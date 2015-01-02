import '6to5/polyfill';
jest.dontMock('../app/server/chinese.js');
import chinese from '../app/server/chinese';

describe('isCJKCharacter', function () {
    it('returns false on illegal input', function () {
        expect(chinese.isCJKCharacter('')).toBe(false);
    });

    it('correctly identifies Chinese characters', function () {
        expect(chinese.isCJKCharacter('平')).toBe(true);
    });

    it('correctly identifies non-Chinese characters', function () {
        expect(chinese.isCJKCharacter('A')).toBe(false);
    });
});

describe('isFlatPinyinSyllable', function () {
    it('correctly identifies flat pinyin syllables', function () {
        expect(chinese.isFlatPinyinSyllable('shi')).toBe(true);
        expect(chinese.isFlatPinyinSyllable('dou')).toBe(true);
        expect(chinese.isFlatPinyinSyllable('blah')).toBe(false);
    });
});

describe('partitionPinyin', function () {
    it('correctly partitions flat pinyin', function () {
        expect(chinese.partitionPinyin("wangzi")).toEqual([
            ['wa', 'ng', 'zi'],
            ['wang', 'zi']
        ]);
    });

    it('returns an empty array if no partitions exist', function () {
        expect(chinese.partitionPinyin('qweinfa')).toEqual([]);
    });
});

describe('diacriticSyllableToNumbered', function () {
    it('converts a diacritic syllable to a numbered syllable', function () {
        expect(chinese.diacriticSyllableToNumbered('yóu')).toBe('you2');
        expect(chinese.diacriticSyllableToNumbered('LǛ')).toBe('LÜ4');
    });

    it('returns undefined upon malformed input', function () {
        expect(chinese.diacriticSyllableToNumbered('y')).toBeUndefined();
        expect(chinese.diacriticSyllableToNumbered('yóóu')).toBeUndefined();
    });
});

describe('numberedSyllableToDiacritic', function () {
    it('converts numbered syllables to syllables with diacritics', function () {
        expect(chinese.numberedSyllableToDiacritic('you2')).toBe('yóu');  
        expect(chinese.numberedSyllableToDiacritic('LÜ3')).toBe('LǙ');  
        expect(chinese.numberedSyllableToDiacritic('fei1')).toBe('fēi');  
        expect(chinese.numberedSyllableToDiacritic('jing4')).toBe('jìng');  
    });
});