const chai = require('chai')
const expect = chai.expect
const filesController = require('../../../src/controllers/files.controller')
const filesService = require('../../../src/services/files.service')

describe('Files controller', () => {
  const req = { query: {} }
  const res = {
    json: (param) => param
  }
  const returns = (param) => param
  const throws = () => {
    throw new Error('Mock Error')
  }

  describe('GET /files/data', () => {
    it('Throws when an internal error happens', async () => {
      filesService.getAll = throws
      const data = await filesController.getParsedData(req, res)
      expect(data.status).to.be.equal(500)
      expect(data.message).to.be.equal('Mock Error')
    })
    it('Throws when file was not found', async () => {
      filesService.getSingleFile = returns(undefined)
      req.query = { fileName: 'SomeFile' }
      const data = await filesController.getParsedData(req, res)
      expect(data.status).to.be.equal(500)
    })
    it('should accept a fileName query param', async () => {
      filesService.getSingleFile = returns
      req.query = { fileName: 'SomeFile' }
      const data = await filesController.getParsedData(req, res)
      expect(data).to.be.equal('SomeFile')
    })
  })

  describe('GET /files/LIST', () => {
    it('Throws when an internal error happens', async () => {
      filesService.getList = throws
      const data = await filesController.getRawList(req, res)
      expect(data.status).to.be.equal(500)
      expect(data.message).to.be.equal('Mock Error')
    })
  })
})
