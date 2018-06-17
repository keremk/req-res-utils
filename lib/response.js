const R = require('ramda');
const paging = require('./paging');
const getIds = require('./ids');

const checkIfItemExists = (items, itemId) => {
  const item = items[itemId]
  if (typeof item == 'undefined') {
    return false;
  } else {
    return true;
  }
};

const createResponse = (args, maxAllowed, items, createItemInfo) => {
  const ids = getIds(args, maxAllowed);

  const checkIfItemExistsWithinItems = R.curry(checkIfItemExists)(items);
  const findItems = R.filter(checkIfItemExistsWithinItems);
  
  const createItemInfoWithinItems = R.curry(createItemInfo)(items);
  const createItems = R.map(createItemInfoWithinItems);
  
  const pageItems = R.curry(paging.getPagedItems)(args);
  
  return R.pipe(
    findItems,
    createItems,
    pageItems
  )(ids);
};

module.exports = createResponse;