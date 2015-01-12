jest.autoMockOff();

import chinese from '../app/server/chinese';
import R from 'ramda';

describe('isCJKCharacter', function () {
    it('returns false on illegal input', function () {
        expect(chinese.isCJKCharacter('')).toBe(false);
    });

    it('correctly identifies Chinese characters', function () {
        expect(chinese.isCJKCharacter('平')).toBe(true);
        expect(chinese.isCJKCharacter('你')).toBe(true);
        expect(chinese.isCJKCharacter('好')).toBe(true);
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

describe('greedyFindFlatPinyin', function () {
    let f = chinese.greedyFindFlatPinyin;

    it('finds longer pinyin strings before shorter ones', function () {
        expect(f('hao')).toBe('hao');
        expect(f('wang')).toBe('wang');
    });
});

describe('partitionPinyin', function () {
    it('correctly partitions flat pinyin', function () {
        expect(chinese.partitionPinyin("guangdong")).toEqual([
            ['gu', 'ang', 'dong'],
            ['guang', 'dong']
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

describe('smartPartition', function () {
    let f = R.compose(R.pluck('string'), chinese.smartPartition);

    it('partitions hanzi', function () {
        expect(f('你好')).toEqual(['你', '好']);
    });

    it('partitions hanzi mixed with flat pinyin', function () {
        expect(f('你hao')).toEqual(['你', 'hao']);
        expect(f('nihao吗')).toEqual(['ni', 'hao', '吗']);
        expect(f('四是四shishishishi四是十四四十shi四十'))
            .toEqual(['四', '是', '四', 'shi', 'shi', 'shi', 'shi', '四', '是',
                      '十', '四', '四', '十', 'shi', '四', '十']);
    });

    it('partitions hanzi mixed with numbered pinyin', function () {
        expect(f('zhen1')).toEqual(['zhen1']);
        expect(f('zhen1心')).toEqual(['zhen1', '心']);
    });

    it('partitions hanzi, numbered pinyin and flat pinyin', function () {
        expect(f('wohen3悲伤')).toEqual(['wo', 'hen3', '悲', '伤']);
        expect(f('月liangdaibiaowo3dexin1'))
            .toEqual(['月', 'liang', 'dai', 'biao', 'wo3', 'de', 'xin1']);
    });
});

describe('getTone', function () {
    it('returns the tone of a numbered pinyin syllable', function () {
        expect(chinese.getTone('ping2')).toBe(2);
    });
});