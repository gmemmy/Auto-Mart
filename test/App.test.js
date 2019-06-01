/* eslint-disable no-undef */
import { use, expect, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/App';

use(chaiHttp);

describe('GET /api/v1/carSales', () => {
  it('should post a new car sale advertisement', (done) => {
    request(app)
      .get('/api/v1/carSales')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.ownProperty('status' && 'data');
        expect(body.status).to.equal(200);
        expect(body.data[0]).to.have.ownProperty('id');
        done();
      });
  });
});

describe('GET /api/v1/carSales', () => {
  it('should post a new car sale advertisement', (done) => {
    request(app)
      .get('/api/v1/carSales')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.ownProperty('status' && 'data');
        expect(body.status).to.equal(200);
        expect(body.data[0]).to.have.ownProperty('id');
        done();
      });
  });
});
