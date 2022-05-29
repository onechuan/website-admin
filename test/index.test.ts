import { findMax, twoSum } from './index';

test('findMax([1,2,3])', () => {
  expect(findMax([1, 2, 3])).toBe(3);
});

test('twoSum([2,3,4,6],10)', () => {
  expect(twoSum([2, 3, 4, 6], 10)).toEqual([2,3]);
});
