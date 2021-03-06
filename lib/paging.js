const R = require('ramda');

const DEFAULTOFFSET = 0;
const DEFAULTLIMIT = 100;

const parseOffset = args => {
  if (args.hasOwnProperty('offset')) {
    return parseInt(args.offset);
  } else {
    return DEFAULTOFFSET;
  }
};

const parseLimit = args => {
  if (args.hasOwnProperty('limit')) {
    return parseInt(args.limit);
  } else {
    return DEFAULTLIMIT;
  }
};

const getValidOffset = (total, offset) => {
  if (offset < 0) {
    return DEFAULTOFFSET;
  } else if (offset >= total) {
    return total - 1;
  } else {
    return offset;
  }
};

const getValidLimit = (offset, total, limit) => {
  if (limit < 0) {
    return DEFAULTLIMIT < total ? DEFAULTLIMIT : total;
  } else if ((offset + limit) >= total) {
    return total - offset;
  } else {
    return limit;
  }  
};

const getPagingInfo = (args, total) => {
  const validOffsetWithTotal = R.curry(getValidOffset)(total);
  const offset = R.pipe(
    parseOffset, 
    validOffsetWithTotal
  )(args);
  const validLimitWithOffsetAndTotal = R.curry(getValidLimit)(offset, total);
  const limit = R.pipe(
    parseLimit, 
    validLimitWithOffsetAndTotal
  )(args);
  return {
    offset: offset,
    limit: limit,
    total: total
  }
};

const getPagedItems = (args, items) => {
  const pageInfo = getPagingInfo(args, items.length);
  return {
    metadata: pageInfo,
    data: R.slice(pageInfo.offset, pageInfo.offset + pageInfo.limit)(items)
  }
};

module.exports.getPagingInfo = getPagingInfo;
module.exports.getPagedItems = getPagedItems;