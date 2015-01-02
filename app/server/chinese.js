import R from 'ramda';

const CJK_RANGES = [
    [0x4E00, 0x9FFF],
    [0x3400, 0x4DFF],
    [0x20000, 0x2A6DF],
    [0xF900, 0xFAFF],
    [0x2F800, 0x2FA1F]
];

const PINYIN_SYLLABLES = [
    'bo','ba','bo','bai','bei','bao','ban','ben','bang','beng','bu','bi','bie',
    'biao','bian','bin','bing','po','pa','po','pai','pei','pao','pou','pan',
    'pen','pang','peng','pu','pi','pie','piao','pian','pin','ping','mo','ma',
    'mo','me','mai','mei','mao','mou','man','men','mang','meng','mu','mi','mie',
    'miao','miu','mian','min','ming','fo','fa','fo','fei','fou','fan','fen',
    'fang','feng','fu','de','da','de','dai','dei','dao','dou','dan','den',
    'dang','deng','dong','du','duo','dui','duan','dun','di','dia','die','diao',
    'diu','dian','ding','te','ta','te','tai','tei','tao','tou','tan','tang',
    'teng','tong','tu','tuo','tui','tuan','tun','ti','tie','tiao','tian','ne',
    'na','ne','nai','nei','nao','nou','nan','nen','nang','neng','nong','nu',
    'nuo','nuan','nun','ni','nie','niao','niu','nian','niang','nin','ning',
    'le','la','le','lai','lei','lao','lou','lan','lang','leng','long','lu',
    'luo','luan','lun','li','lia','lie','liao','liu','lian','liang','lin',
    'ling','ge','ga','ge','gai','gei','gao','gou','gan','gen','gang','geng',
    'gong','gu','gua','guo','guai','gui','guan','guang','gun','ke','ka','ke',
    'kai','kei','kao','kou','kan','ken','kang','keng','kong','ku','kua','kuo',
    'kuai','kui','kuan','kuang','kun','he','ha','he','hai','hei','hao','hou',
    'han','hen','hang','heng','hong','hu','hua','huo','huai','hui','huan',
    'huang','hun','zi','za','ze','zai','zei','zao','zou','zan','zen','zang',
    'zeng','zong','zu','zuo','zui','zuan','zun','zi','ci','ca','ce','cai',
    'cao','cou','can','cen','cang','ceng','cong','cu','cuo','cui','cuan','cun',
    'cin','si','sa','se','sai','sao','sou','san','sen','sang','seng','song',
    'su','suo','sui','suan','sun','si','zhi','zha','zhe','zhai','zhei','zhao',
    'zhou','zhan','zhen','zhang','zheng','zhong','zhu','zhua','zhuo','zhuai',
    'zhui','zhuan','zhuang','zhun','zhi','chi','cha','che','chai','chao','chou',
    'chan','chen','chang','cheng','chong','chu','chua','chuo','chuai','chui',
    'chuan','chuang','chun','chi','shi','sha','she','shai','shei','shao','shou',
    'shan','shen','shang','sheng','shu','shua','shuo','shuai','shui','shuan',
    'shuang','shun','shi','ri','re','rao','rou','ran','ren','rang','reng',
    'rong','ru','rua','ruo','rui','ruan','run','ri','ji','ji','jia','jie',
    'jiao','jiu','jian','jiang','jin','jing','jiong','ju','jue','juan','jun',
    'qi','qi','qia','qie','qiao','qiu','qian','qiang','qin','qing','qiong','qu',
    'que','quan','qun','xi','xi','xia','xie','xiao','xiu','xian','xiang','xin',
    'xing','xiong','xu','xue','xuan','xun','a','o','e','ai','ei','ai','ao','ou',
    'an','en','ang','ong','wu','wa','wo','wai','wei','wan','wang','wen','weng',
    'yi','ya','ye','yao','you','yan','yang','yin','ying','yong','yu','yue',
    'yuan','yun','ng'
];

const MAX_PINYIN_LENGTH = R.max(
    R.map(
        R.prop('length'),
        PINYIN_SYLLABLES
    )
);

const TONE_MARKS = {
    1: "āēīōūǖĀĒĪŌŪǕ",
    2: "áéíóúǘÁÉÍÓÚǗ",
    3: "ǎěǐǒǔǚǍĚǏǑǓǙ",
    4: "àèìòùǜÀÈÌÒÙǛ",
    5: "aeiouüAEIOUÜ"
};

const VALID_PINYIN_CHARACTERS =
    "āēīōūǖĀĒĪŌŪǕáéíóúǘÁÉÍÓÚǗǎěǐǒǔǚǍĚǏǑǓǙàèìòùǜÀÈÌÒÙǛ" +
    "aeiouüAEIOUÜ" +
    "qwrtypsdfghjklzxcvbnm" +
    "QWRTYPSDFGHJKLZXCVBNM";

/**
 * Determines whether a character is a Chinese, Japanese or Korean character.
 */
export function isCJKCharacter (character) {
    if (!character || character.length !== 1) { return false; }

    for (cjkRange of CJK_RANGES) {
        let codePoint = character.codePointAt(0);

        if (codePoint > cjkRange[0] && codePoint < cjkRange[1]) {
            return true;
        }
    }
    
    return false;
}

/**
 * Returns true if the passed syllable is a valid pinyin syllable, not including
 * tone marks or tone numbers.
 */
export function isFlatPinyinSyllable (syllable) {
    return PINYIN_SYLLABLES.indexOf(syllable.toLowerCase()) !== -1;
}

/**
 * Finds all possible partitions of a flat, spaceless string of pinyin. Returns
 * an array of arrays containing pinyin syllables, or an empty array if no
 * partitions exist.
 */
export function partitionPinyin (syllable) {
    let partitions = [];

    (function partition (head, rest) {
        let candidateSyllable = '';

        for (let character of rest) {
            candidateSyllable += character;

            if (isFlatPinyinSyllable(candidateSyllable)) {
                partition(
                    head.concat([candidateSyllable]),
                    rest.substr(candidateSyllable.length)
                );
            }

            if (candidateSyllable.length > MAX_PINYIN_LENGTH) {
                break;
            }
        }

        if (candidateSyllable === '') {
            partitions.push(head);
        }
    })([], syllable);

    return partitions;
}

/**
 * Converts a syllable with diacritical tone marks to one where the tone is
 * indicated by a number at the end. Returns undefined upon multiple syllables,
 * tone marks and non-pinyin characters.
 */
export function diacriticSyllableToNumbered (input) {
    let ret = '',
        tone = 0;

    const DIACRITIC_LETTERS =
        TONE_MARKS[1] + TONE_MARKS[2] + TONE_MARKS[3] + TONE_MARKS[4];

    for (let character of input) {
        if (VALID_PINYIN_CHARACTERS.indexOf(character) === -1) {
            return undefined;
        }

        let diacriticIndex = DIACRITIC_LETTERS.indexOf(character);
        if (diacriticIndex !== -1) {
            // This syllable already has a tone mark
            if (tone !== 0) { return undefined; }

            ret += TONE_MARKS[5][diacriticIndex % 12];
            tone = Math.floor(diacriticIndex / 12) + 1;
        } else {
            ret += character;
        }
    }

    if (!tone) { return undefined; }
    return ret + tone;
}

/**
 * Converts a syllable with a tone number at the end to a syllable with
 * diacritical tone marks.
 */
export function numberedSyllableToDiacritic (input) {
    let tone = parseInt(R.last(input), 10);
    if (!tone) { return undefined; }

    input = input.replace('V', 'Ü').replace('v', 'ü');

    /*
     * From http://pinyin.info/rules/where.html:
     *
     * A and e trump all other vowels and always take the tone mark.
     * There are no Mandarin syllables in Hanyu Pinyin that contain both a and e.
     * In the combination ou, o takes the mark.
     * In all other cases, the final vowel takes the mark.
     *
     */
    let index = R.find(R.lt(-1), [
        input.search(/[ae]/i),
        input.search(/ou/i),
        R.findLastIndex((s) => R.contains(s, 'aeiouüAEIOUÜ'), input)
    ]);

    if (!index) { return undefined; }

    let toneCharacter = TONE_MARKS[tone][TONE_MARKS[5].indexOf(input[index])];

    // Replace the tonal character and remove the tone number
    return input.substring(0, index) +
        toneCharacter +
        input.substring(index + 1, input.length - 1);
}

export function smartPartition (input) {

}