const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect
const app = require('../../index')

describe('App', () => {
  describe('GET /files/data', () => {
    it('should retrieve all valid CSVs', (done) => {
      chai
        .request(app)
        .get('/files/data')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body.length).to.be.greaterThan(0)
          expect(res.header['content-type']).to.equal(
            'application/json; charset=utf-8'
          )
          done()
        })
    })
    describe('Query param ?fileName', () => {
      it('should retrieve any valid csv through query fileName', (done) => {
        chai
          .request(app)
          .get('/files/data?fileName=test2.csv')
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('file')
            expect(res.body).to.have.property('lines')
            expect(res.header['content-type']).to.equal(
              'application/json; charset=utf-8'
            )
            done()
          })
      })
      it('should retrieve any info from a not found file', (done) => {
        chai
          .request(app)
          .get('/files/data?fileName=invalidFile.csv')
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.status).to.equal(404)
            expect(res.body).to.have.property('message')
            expect(res.header['content-type']).to.equal(
              'application/json; charset=utf-8'
            )
            done()
          })
      })
      it('should retrieve any info from a file error', (done) => {
        chai
          .request(app)
          .get('/files/data?fileName=test4.csv')
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.status).to.equal(500)
            expect(res.body).to.have.property('message')
            expect(res.header['content-type']).to.equal(
              'application/json; charset=utf-8'
            )
            done()
          })
      })
      it('should retrieve undefined when the file was not parsable', (done) => {
        chai
          .request(app)
          .get('/files/data?fileName=test1.csv')
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.status).to.equal(500)
            expect(res.body).to.have.property('message')
            expect(res.header['content-type']).to.equal(
              'application/json; charset=utf-8'
            )
            done()
          })
      })
    })
  })

  describe('GET /files/list', () => {
    it('retrieves an array of raw CSV', (done) => {
      chai
        .request(app)
        .get('/files/list')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body.length).to.be.greaterThan(0)
          expect(res.header['content-type']).to.equal(
            'application/json; charset=utf-8'
          )
          done()
        })
    })
  })
})
