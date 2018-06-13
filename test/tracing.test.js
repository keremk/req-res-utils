const forwardTraceHeaders = require('../lib/tracing');

test('Trace headers forwarded from allowed list', () => {
  const incomingHeaders = {
    'x-request-id': 100,
    'x-dev-user': "foo"
  };

  expect(forwardTraceHeaders(incomingHeaders)).toEqual(
    {
      'x-request-id': 100,
      'x-dev-user': "foo"
    }
  );  
});
