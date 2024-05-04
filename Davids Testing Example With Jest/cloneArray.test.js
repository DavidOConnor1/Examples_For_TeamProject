const cloneArray = require('./js/cloneArray.js');

//use toEqual instead of toBe for this function because the duplicate array is a not stored in the same memory as the first array

test('cloneArray should return an array', () => {
    const arr = [1,2,3];
    expect(cloneArray(arr)).toEqual(arr);
    expect(cloneArray(arr)).not.toBe(arr);
});