# TB CSV Consumer

This project can be run with the docker compose file in the main root (or docker run individually), also if one wishes to start each service separately via Node both services recognize the `npm start` command

To start both clients run `docker compose up` in the main directory

## Api
To run the client run `npm start` and it will be open on http://localhost:4000

### Api Test

In order to run tests the command `npm test` can be used, following elements are tested

- APP integration with API
- Files Controller and its exceptions
- parseCsv util and its exceptions

---

## Client

To run the client run `npm build` followed by `npm start` and it will be open on http://localhost:3000

### Client Test

In order to run tests the command `npm test` can be used, following elements are tested

- Nav render with mutation on Error
- Search bar render with input changes and submit on click
- Files Table render with dynamic rendering of lines according to file
