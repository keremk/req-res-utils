# Utilities for Request & Response

A collection of utilities to work with HTTP request and responses.

## Paging
Validates provided paging information based on limit and offset information and returns the validated results. 

Example:

``` javascript

const args = {
    "offset": "0",
    "limit": "12"
  };

// pass in the provided limit, offset as args and a total count and return a validated limit and offset

expect(getPagingInfo(args, 10)).toEqual(
  {
    "offset": 0,
    "limit": 10
  }
);  

```

## Filtering
Filters an array items based on an argument hash of filter parameters (all ANDed together) and a list of filter functions.

Example filter argument list: (filter by revenue and genre)

``` javascript
const args = {
    "revenue": "1000",
    "genre": "Drama"
  };

```

Example filter functions: (revenue and genre filters)

``` javascript

const revenueFilter = (value) => {
  return item => item.revenue < parseInt(value);
};

const genreFilter = (value) => {
  return item => item.genre === value;
};

const filters = [
  {
    "name": "revenue", 
    "action": revenueFilter 
  },
  {
    "name": "genre",
    "action": genreFilter
  }
];

```

Example of filtering movies based on above criteria:

``` javascript

const filteredMovies = filterItems(args, filters, movies);

expect(filteredMovies).toEqual(
  [
    {
      "title": "Movie1",
      "genre": "Drama",
      "revenue": 500          
    }
  ]
); 

```

## Tracing
Filters an incoming hash of headers to those required by [Istio](https://istio.io/) and returns those:

Example:

``` javascript

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

```

## Parsing Ids vs. Id
Returns a comma delimited list of ids or a single id (from ids or id attributes) as an array of ids.

``` javascript

const args = {
    "ids": "12, 3, 5"
  };

expect(getIds(args)).toEqual(["12", "3", "5"]);

const args = {
    "id": "12"
  };

expect(getIds(args)).toEqual(["12"]);  

```

