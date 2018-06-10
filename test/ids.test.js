const getIds = require('../lib/ids');

test('get ids list if ids parameter is supplied', () => {
  const args = {
    "ids": "12, 3, 5"
  };

  expect(getIds(args)).toEqual(["12", "3", "5"]);  
});

test('get ids list if id parameter is supplied', () => {
  const args = {
    "id": "12"
  };

  expect(getIds(args)).toEqual(["12"]);  
});

test('get ids list if ids parameter with one id is supplied', () => {
  const args = {
    "ids": "12"
  };

  expect(getIds(args)).toEqual(["12"]);  
});

test('get an exception if there are more than 10 ids', () => {
  const args = {
    "ids": "1,2,3,4,5,6,7,8,9,10,11"
  };

  expect(() => getIds(args)).toThrow("Max 10 items can be requested, received 11 instead");  
});
