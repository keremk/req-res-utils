// The below trace headers are needed by Istio to allow tracing
const forwardTraceHeaders = incomingHeaders => {
  const allowedHeaderList = [
      'x-request-id',
      'x-b3-traceid',
      'x-b3-spanid',
      'x-b3-parentspanid',
      'x-b3-sampled',
      'x-b3-flags',
      'x-ot-span-context',
      'x-dev-user'
  ];
  const headers = {};
  for (let h of allowedHeaderList) {
      if (incomingHeaders[h]) {
          headers[h] = incomingHeaders[h];
      }
  }
  return headers;
}

module.exports = forwardTraceHeaders;