const getCORSHeaders = () => {
  return {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers':
      'content-type, authorization, content-length, x-requested-with, accept, origin',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Allow': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Origin': '*'
  };
};

module.exports = getCORSHeaders;