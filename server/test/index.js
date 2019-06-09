/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../App';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /api/v1/carSales', () => {
  it('should view all available car sale advertisements', (done) => {
    chai.request(app)
      .get('/api/v1/carSales')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.ownProperty('data');
        expect(body.status).to.equal(200);
        expect(body.data[0]).to.have.ownProperty('id');
        done();
      });
  });
});

describe('GET /api/v1/carSales/:id', () => {
  it('should view a specific car sale advertisement', (done) => {
    chai.request(app)
      .get('/api/v1/carSales/2')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.ownProperty('status' || 'data' || 'error');
        expect(body.status).to.equal(200);
        expect(body.data[0]).to.have.ownProperty('id');
        done();
      });
  });
});

describe('GET /api/v1/carSales/:id (id is non-existent)', () => {
  it('should return an error if a user requests for an id that doesn\'t exist', (done) => {
    chai.request(app)
      .get(`/api/v1/carSales/${faker.random.number()}`)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.ownProperty('status' && 'error');
        expect(body.status).to.equal(404);
        expect(body.error).to.be.equal('Oops! no car found with this id');
        done();
      });
  });
});

describe('POST /api/v1/carSales', () => {
  it('should post a new car sale advertisement', (done) => {
    chai.request(app)
      .post('/api/v1/carSales')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.ownProperty('status' && 'data');
        expect(body.status).to.equal(201);
        expect(body.data[0]).to.have.ownProperty('id');
        done();
      });
  });
});

describe('POST /api/v1/carSales/', () => {
  it('should return an error if the user input is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/carSales')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.ownProperty('status' && 'data');
        expect(body.status).to.equal(400);
        expect(body.data[0]).to.have.ownProperty('id');
        done();
      });
  });
});
