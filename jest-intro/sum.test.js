const sum = require('./sum');

test('adding two numbers correctly', () => {
  expect(sum(1, 2)).toBe(3);
});
