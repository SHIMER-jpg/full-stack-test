const https = require('https')

const customFetch = (url, options = {}) =>
  new Promise((resolve, reject) => {
    try {
      const data = []
      https.get(url, options, (response) => {
        response.on('data', (chunk) => {
          data.push(chunk)
        })
        response.on('end', () => {
          response.json = () => JSON.parse(Buffer.concat(data).toString())
          response.text = () => Buffer.concat(data).toString()
          resolve(response)
        })
      })
    } catch (e) {
      reject(e.message)
    }
  })

module.exports = customFetch
