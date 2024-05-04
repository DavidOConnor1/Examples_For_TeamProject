const sum = require('./js/sum.js');

test('one plus two should equal to three', () => {
    expect(sum(1,2)).toBe(3);
});