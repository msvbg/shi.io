jest.autoMockOff();

import util from 'app/common/utilities.js';

describe('stringSlice', function () {
    it('behaves like String.prototype.slice', function () {
       expect(util.stringSlice("foobar", 2, 3)).toBe("foobar".slice(2, 3));
    });   
})