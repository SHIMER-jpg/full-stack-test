const { expect } = require('chai')
const parseCsv = require('../../../src/utils/parseCsv')

const invalidFileMock = 'file,header2,header3,header4'

const invalidLineMock =
  'file,header2,header3,header4\nfilename,1,2\nfilename,1,2,3'
const validMock =
  'file,header2,header3,header4\nfilename,1,2,3\nfilename,1,2,3'

describe('Parse CSV Util', () => {
  it('Returns undefined if CSV is not parsable', () => {
    expect(parseCsv(invalidFileMock)).to.be.undefined
  })
  it('Skips invalid lines', () => {
    expect(parseCsv(invalidLineMock).lines.length).to.equal(1)
  })
  it('Returns a CSV file', () => {
    const data = parseCsv(validMock)
    expect(data.lines.length).to.equal(2)
    expect(data.file).to.equal('filename')
  })
})
