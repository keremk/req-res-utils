const R = require('ramda');

const createPipelinedFilters = (args, filters) => {
  const checkIfArgExists = R.filter(filter => args.hasOwnProperty(filter.name));
  const createPipeline = R.map(filter => R.filter(filter.action(args[filter.name])));

  return R.pipe(
    checkIfArgExists,
    createPipeline
  )(filters);
}

const filterItems = module.exports = (args, filters, items) => {
  const pipelinedFilters = createPipelinedFilters(args, filters);
  return R.reduce(
    (acc, action) => {
       return action(acc) 
    },
    items
  )(pipelinedFilters);
}