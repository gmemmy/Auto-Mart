/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../App';

const { expect } = chai;

chai.use(chaiHttp);

const user = {
  email: 'nuelojay22@gmail.com',
  username: 'gmemmy',
  firstName: 'Emmanuel',
  lastName: 'Atawodi',
  password: '1234567',
  confirmPassword: '1234567',
  address: 'Louisana',
  isAdmin: false,
};

const admin = {
  email: 'nuelojay2000@gmail.com',
  username: 'gmemmy22',
  firstName: 'Emmanuella',
  lastName: 'Atawodilina',
  password: '1234567hfh',
  confirmPassword: '1234567hfh',
  address: 'Springville',
  isAdmin: true,
};

let token = 'njenkewjfbbef';
// eslint-disable-next-line no-unused-vars
let adminToken;

// authentication routes test

describe('POST api/v1/auth/signin', () => {
  it('should succesffuly sign in a user if the inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        token = body.data[0].token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.equal(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('existingUser');
        expect(body.data[0].existingUser).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signin', () => {
  it('should succesffuly sign in the admin if the inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(admin)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        adminToken = body.data[0].token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.equal(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('existingUser');
        expect(body.data[0].existingUser).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('GET api/v1/carSales', () => {
  it('should return an empty array with status 204 if carSale records are empty', (done) => {
    chai.request(app)
      .get('/api/v1/carSales')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body.status).to.equal(204);
        expect(body.data.length).to.be.equal(0);
        done();
      });
  });
});

describe('POST api/v1/carSales', () => {
  it('should create a car sale sale advert if the user inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/carSales/')
      .set({ 'x-access-token': token })
      .send({
        state: 'new',
        price: '500,000',
        manufacturer: `${faker.name.firstName()}`,
        model: `${faker.random.words()}`,
        bodyType: 'car',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body.status).to.equal(200);
        expect(body.data[0]).to.be.an('object');
        expect(body.data[0].message).to.be.a('string');
        expect(body.data[0]).to.haveOwnProperty('id' && 'message');
        expect(body.data[0].message).to.equal('Successfully created a new car sale advertisemen');
        done();
      });
  });
});

describe('POST api/v1/carSales', () => {
  it('should return an unauthorized error if there is no header token', (done) => {
    chai.request(app)
      .post('/api/v1/carSales/')
      .send({
        state: 'new',
        price: '500,000',
        manufacturer: `${faker.name.firstName()}`,
        model: `${faker.random.words()}`,
        bodyType: 'car',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('error');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(401);
        expect(body.error).to.be.equals('Unauthorized! you have to sign in first');
        done();
      });
  });
});

describe('POST api/v1/carSales', () => {
  it('should return an unauthorized error if there is an invalid jwt token', (done) => {
    chai.request(app)
      .post('/api/v1/carSales/')
      .set('x-access-token', '54gvdgiejfnejfnjenfjenjfnfjef')
      .send({
        state: 'new',
        price: '500,000',
        manufacturer: `${faker.name.firstName()}`,
        model: `${faker.random.words()}`,
        bodyType: 'car',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('error');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(401);
        expect(body.error).to.be.equals('Token is invalid, please sign in');
        done();
      });
  });
});

describe('POST api/v1/carSales', () => {
  it('should return an error if the user inputs are invalid', (done) => {
    chai.request(app)
      .post('/api/v1/carSales/')
      .set({ 'x-access-token': token })
      .send({
        state: undefined,
        price: undefined,
        manufacturer: undefined,
        model: undefined,
        bodyType: undefined,
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('GET api/v1/carSales', () => {
  it('should return all unsold car sale adverts', (done) => {
    chai.request(app)
      .get('/api/v1/carSales')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body).to.haveOwnProperty('status');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('id');
        done();
      });
  });
});

describe('GET api/v1/carSales/:id', () => {
  it('should return a car sale advert with a specific id', (done) => {
    chai.request(app)
      .get('/api/v1/carSales/2')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('status' && 'data');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        done();
      });
  });
});

describe('GET api/v1/carSales/:id (id is non-existent)', () => {
  it('should return an error if a user attempts to make a request for a non-existent car id', (done) => {
    chai.request(app)
      .get(`/api/v1/carSales/${faker.random.number() + faker.random.number()}`)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('error');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.equal('Oops! no car found with this id.');
        done();
      });
  });
});

describe('PATCH api/v1/carSales/:id/price', () => {
  it('should update the price of a car sale advert if it exists', (done) => {
    chai.request(app)
      .patch('/api/v1/carSales/2/price')
      .set({ 'x-access-token': token })
      .send({
        price: '5,000,000',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data[0]).to.haveOwnProperty('message');
        expect(body.data[0]).to.haveOwnProperty('id' && 'message');
        done();
      });
  });
});

describe('PATCH api/v1/carSales/:id/price', () => {
  it('should return an error if the the specified id doesn\'t exist', (done) => {
    chai.request(app)
      .patch('/api/v1/carSales/64464738384/price')
      .set({ 'x-access-token': token })
      .send({
        price: '5,000,000',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('PATCH api/v1/carSales/:id/price', () => {
  it('should return an error if the car price field is empty', (done) => {
    chai.request(app)
      .patch('/api/v1/carSales/2/price')
      .set({ 'x-access-token': token })
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('PATCH api/v1/carSales/:id/status', () => {
  it('should update the status of a car sale advert if it exists', (done) => {
    chai.request(app)
      .patch('/api/v1/carSales/2/status')
      .set({ 'x-access-token': token })
      .send({
        status: 'sold',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data[0]).to.haveOwnProperty('message');
        expect(body.data[0]).to.haveOwnProperty('id' && 'message');
        done();
      });
  });
});

describe('DELETE api/v1/admin/:id/', () => {
  it('should delete a record by id if it exists', (done) => {
    chai.request(app)
      .delete('/api/v1/carSales/1/')
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data[0]).to.haveOwnProperty('id' && 'message');
        done();
      });
  });
});
