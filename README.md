# Utilities for Request & Response

A collection of utilities to work with HTTP request and responses.

## Paging
Validates provided paging information based on limit and offset information and returns the validated results. 

Example:

``` javascript

const args = {
    "offset": "0",
    "limit": "5"
  };

// pass in the provided limit, offset as args and a total count and return a validated limit and offset

const pagingInfo = getPagingInfo(args, 10);  

```
## Filtering


## CORS Headers


## Tracing


## Parsing Ids vs. Id

