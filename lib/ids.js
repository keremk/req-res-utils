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

const validateCount = (maxAllowed, ids) => {
  if (ids.length > maxAllowed) {
    throw new Error(`Max ${maxAllowed} items can be requested, received ${ids.length} instead.`);
  } else {
    return ids;
  }
};

const getIds = (args, maxAllowed = 10) => {
  const validateCountByMax = R.curry(validateCount)(maxAllowed);
  return R.pipe(
    parseIds,
    trimWhitespace,
    validateCountByMax
  )(args);
};

module.exports = getIds;