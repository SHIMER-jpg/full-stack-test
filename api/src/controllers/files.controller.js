const filesService = require('../services/files.service')

async function getParsedData (req, res) {
  try {
    const { fileName } = req.query
    if (fileName) {
      const file = await filesService.getSingleFile(fileName)
      if (!file) throw new Error('File could not be converted to CSV')
      return res.json(file)
    }

    const csvPayload = await filesService.getAll()
    res.json(csvPayload)
  } catch (error) {
    res.json({
      message:
        error.message || 'There was an error fetching the requested files',
      status: 500
    })
  }
}

async function getRawList (_, res) {
  try {
    res.json(await filesService.getList())
  } catch (error) {
    res.json({
      message: error.message || 'There was an error fetching the raw files',
      status: 500
    })
  }
}

module.exports = {
  getParsedData,
  getRawList
}
