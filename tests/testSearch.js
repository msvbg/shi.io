jest.dontMock('../app/server/chinese.js');
jest.dontMock('../app/server/search.js');

import '6to5/polyfill';
import {classifyQuery, QueryTypes} from '../app/server/search';

describe('classifySearch', function () {
    it('identifies Chinese queries as Chinese-L1', function () {
        expect(classifyQuery('苹果')).toBe(QueryTypes.CHINESE_TO_L1);
        expect(classifyQuery('shizi')).toBe(QueryTypes.CHINESE_TO_L1);
        expect(classifyQuery('wang2 zi3')).toBe(QueryTypes.CHINESE_TO_L1);
    });

    it('identifies non-Chinese queries as L1-Chinese', function () {
        expect(classifyQuery('breadcrumbs')).toBe(QueryTypes.L1_TO_CHINESE);
    });
});
