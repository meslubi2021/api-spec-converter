const supertest = require('supertest');

const app = require('../../app');
const request = supertest(app);

describe('POST /api/specification/invalid/openapi_3', () => {
  it('should return 404 for invalid conversion', (done) => {
    request
      .post('/api/specification/invalid/openapi_3')
      .attach('file', 'test/converterRouter/swagger_2/data/input/swagger_2.json')
      .end((err, res) => {
        if(err) throw err;
        expect(res.status).toBe(404);
        expect(res.body).toEqual({'message': 'Conversion mapping not found.'});
        done();
      });
  });

  it('should return 400 for unavailablity of input file', (done) => {
    request
      .post('/api/specification/swagger_2/openapi_3')
      .end((err, res) => {
        if(err) throw err;
        expect(res.status).toBe(400);
        expect(res.body).toEqual({'message': 'File not available.'});
        done();
      });
  });

  it('should return 400 for invalid file extension', (done) => {
    request
      .post('/api/specification/swagger_2/openapi_3')
      .attach('file', 'test/common/data/test.raml')
      .end((err, res) => {
        if(err) throw err;
        expect(res.status).toBe(400);
        expect(res.body).toEqual({'message': 'File extension not supported.'});
        done();
      });
  });
});