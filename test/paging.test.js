const paging= require('../lib/paging');

test('get default paging info if no args', () => {
  const emptyArgs = {};

  expect(paging.getPagingInfo(emptyArgs, 10)).toEqual(
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

  expect(paging.getPagingInfo(args, 10)).toEqual(
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

  expect(paging.getPagingInfo(args, 10)).toEqual(
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

  expect(paging.getPagingInfo(args, 10)).toEqual(
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

  expect(paging.getPagingInfo(args, 10)).toEqual(
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

  expect(paging.getPagingInfo(args, 10)).toEqual(
    {
      "offset": 0,
      "limit": 10
    }
  );  
});

test('get paged items', () => {
  const args = {
    "offset": 0,
    "limit": 5
  }

  const items = [1, 2, 3, 4, 5, 6];

  expect(paging.getPagedItems(args, items)).toEqual(
    {
      "pageInfo": {"limit": 5, "offset": 0}, 
      "pagedItems": [1, 2, 3, 4, 5]
    }
  );
});

test('get paged items with non-zero offset', () => {
  const args = {
    "offset": 2,
    "limit": 2
  }

  const items = [1, 2, 3, 4, 5, 6];

  expect(paging.getPagedItems(args, items)).toEqual(
    {
      "pageInfo": {"limit": 2, "offset": 2}, 
      "pagedItems": [3, 4]
    }
  );
});