const R = require('ramda');

const parseIds = args => {
  if (args.hasOwnProperty('ids')) {
    return args.ids.split(',');
  } else if (args.hasOwnProperty('id')) {
    return [args.id];
  } else {
    return [];
  }
};

const trimWhitespace = ids => R.map(s => s.trim())(ids);

const MAXNUMIDS = 10;
const validateCount = ids => {
  if (ids.length > MAXNUMIDS) {
    throw new Error(`Max 10 items can be requested, received ${ids.length} instead.`);
  } else {
    return ids;
  }
};

const getIds = args => {
  return R.pipe(
    parseIds,
    trimWhitespace,
    validateCount
  )(args);
};

module.exports = getIds;