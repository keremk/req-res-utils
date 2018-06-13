const filterItems = require('../lib/filter');
const R = require('ramda');

const movies = [
  {
    "title": "Movie1",
    "genre": "Drama",
    "revenue": 500
  },
  {
    "title": "Movie2",
    "genre": "Drama",
    "revenue": 1500
  },
  {
    "title": "Movie3",
    "genre": "Action",
    "revenue": 500
  }
]
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

test('both filters are applied', () => {
  const args = {
    "revenue": "1000",
    "genre": "Drama"
  };

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
});

test('no filters are applied, all pass through', () => {
  const args = {};

  const filteredMovies = filterItems(args, filters, movies);

  expect(filteredMovies).toEqual(movies);
});

test('one filter is applied', () => {
  const args = {
    "genre": "Drama"
  };

  const filteredMovies = filterItems(args, filters, movies);

  expect(filteredMovies).toEqual(
    [
      {
        "title": "Movie1",
        "genre": "Drama",
        "revenue": 500
      },
      {
        "title": "Movie2",
        "genre": "Drama",
        "revenue": 1500
      }
    ]
  );
});
