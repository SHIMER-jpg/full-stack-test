const { URL, SECRET } = require('../configs/csvApi')
const customFetch = require('../utils/customFetch')

const externalApiRequest = async (path) => {
  const options = {
    headers: {
      authorization: SECRET
    }
  }
  const response = await customFetch(URL + path, options)
  if (response.headers['content-type'] === 'application/json; charset=utf-8') { return response.json() }

  return response.text()
}

module.exports = externalApiRequest
