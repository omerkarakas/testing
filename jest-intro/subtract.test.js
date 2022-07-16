const subtract = require('./subtract');

test('subtracting two numbers correctly', () => {
  expect(subtract(1, 2)).toBe(-1);
});
