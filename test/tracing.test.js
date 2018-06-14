const forwardTraceHeaders = require('../lib/tracing');

test('Trace headers forwarded from allowed list', () => {
  const incomingHeaders = {
    'x-request-id': 100,
    'x-dev-user': "foo",
    'irrelevant-header': "baz"
  };

  expect(forwardTraceHeaders(incomingHeaders)).toEqual(
    {
      'x-request-id': 100,
      'x-dev-user': "foo"
    }
  );  
});
