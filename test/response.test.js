const createResponse = require('../lib/response');

const items = {
  "1": {
    title: "Hello 1",
    genre: "Drama"
  },
  "2": {
    title: "Hello 2",
    genre: "Action"
  },
  "4": {
    title: "Hello 4",
    genre: "Action"
  }
};
const createItemInfo = (items, itemId) => items[itemId];

test('create response with default paging', () => {
  const args = {
    "ids": "1,2,3"
  };
  const maxAllowed = 10;

  const response = createResponse(args, maxAllowed, items, createItemInfo);

  expect(response).toEqual({
    data: [
      {
        title: "Hello 1",
        genre: "Drama"
      },
      {
        title: "Hello 2",
        genre: "Action"
      }],
    metadata: {
      limit: 2,
      offset: 0,
      total: 2
    }
  });
});

test('create response with custom paging', () => {
  const args = {
    ids: "1,2,4",
    limit: 2,
    offset: 0
  };
  const maxAllowed = 10;

  const response = createResponse(args, maxAllowed, items, createItemInfo);

  expect(response).toEqual({
    data: [
      {
        title: "Hello 1",
        genre: "Drama"
      },
      {
        title: "Hello 2",
        genre: "Action"
      }],
    metadata: {
      limit: 2,
      offset: 0,
      total: 3
    }
  });
});
