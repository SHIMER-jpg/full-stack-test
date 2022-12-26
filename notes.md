# Tech Challenge

# External API

- URL: https://echo-serv.tbxnet.com/v1
- Authorization: Bearer aSuperSecretKey

Endpoints to use:

- /secret/files - Retrieves a list of files
- /secret/file/file1.csv - Retrieves file details

File DTO:

- file: file name
- text: text content
- number: numeric content
- hex: hex content

Possible errors to catch:

- Empty files can exist
- Lines with errors can exist (must be discarded)
- Errors downloading a file

```JSON
{
   "file": "file1.csv",
   "lines": [
      {
         "text" :"RgTya",
         "number": 64075909,
         "hex": "70ad29aacf0b690b0467fe2b2767f765"
      },
      . . .
   ]
}
```

> Expected output format

# Internal API

## Endpoints:

- GET /files/data
  - content-type: application/json

```JSON
[
   {
      "file": "file1.csv",
      "lines": [
         {
            "text" :"RgTya",
            "number": 64075909,
            "hex": "70ad29aacf0b690b0467fe2b2767f765"
         },
         . . .
      ]
   }
]
```

> Expected output format for developed endpoint

## Tests

- Must be developed with Mocha-Chai

## Miscellaneous

Only use allowed libraries ExpressJs, Mocha, Chai
Use NodeJS 14 and ES6+

# FrontEnd

It must be done with functional programing and Hook effects
Must run ES6

Only use webpack, React, React Bootstrap

# Extra points

- Using docker compose to run apps

## API

---

- GET /files/list -> retrieves a list of files without parsing
- Add Query Param `?fileName=<fileName>`
- Use Standarjs

## FrontEnd

---

- Redux
- Jest with unit testing
- Filter with the filename endpoint
