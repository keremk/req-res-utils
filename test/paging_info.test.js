const getPagingInfo = require('../lib/paging_info');

test('get default paging info if no args', () => {
  const emptyArgs = {};

  expect(getPagingInfo(emptyArgs, 10)).toEqual(
    {
      "offset": 0,
      "limit": 10
    }
  );  
});

test('get correct offset and limit within valid range', () => {
  const args = {
    "offset": "0",
    "limit": "5"
  };

  expect(getPagingInfo(args, 10)).toEqual(
    {
      "offset": 0,
      "limit": 5
    }
  );  
});

test('get correct offset and limit where limit is capped to total', () => {
  const args = {
    "offset": "0",
    "limit": "12"
  };

  expect(getPagingInfo(args, 10)).toEqual(
    {
      "offset": 0,
      "limit": 10
    }
  );  
});

test('get correct offset and limit when offset is greater than total', () => {
  const args = {
    "offset": "11",
    "limit": "5"
  };

  expect(getPagingInfo(args, 10)).toEqual(
    {
      "offset": 9,
      "limit": 1
    }
  );  
});

test('get correct offset and limit when offset is smaller than 0', () => {
  const args = {
    "offset": "-2",
    "limit": "5"
  };

  expect(getPagingInfo(args, 10)).toEqual(
    {
      "offset": 0,
      "limit": 5
    }
  );  
});

test('get correct offset and limit when limit is smaller than 0', () => {
  const args = {
    "offset": "0",
    "limit": "-5"
  };

  expect(getPagingInfo(args, 10)).toEqual(
    {
      "offset": 0,
      "limit": 10
    }
  );  
});