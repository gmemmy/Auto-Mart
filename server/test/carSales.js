/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../App';

const { expect } = chai;

chai.use(chaiHttp);

const user = {
  email: 'gmemmy22@gmail.com',
  first_name: 'Emmanuel',
  last_name: 'Atawodi',
  password: 'Ojonugwa22',
  confirm_password: 'Ojonugwa22',
  address: 'Louisana',
};

const admin = {
  email: 'nuelojay22@gmail.com',
  username: 'gmemmy22',
  first_name: 'Emmanuel',
  last_name: 'Atawodi',
  password: 'Ojonugwa22',
  confirm_password: 'Ojonugwa22',
  address: 'Springville',
};

let token;
// eslint-disable-next-line no-unused-vars
let adminToken;

// authentication routes test

describe('POST api/v1/auth/signup', () => {
  it('should succesffuly sign up a user if the inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        token = body.data.token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.equal(200);
        expect(body.data).to.haveOwnProperty('token');
        expect(body.data).to.haveOwnProperty('user');
        expect(body.data.user).to.be.an('object');
        expect(body.data.token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signin', () => {
  it('should successfully sign in a user if the sign in inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        token = body.data.token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data).to.haveOwnProperty('token');
        expect(body.data).to.haveOwnProperty('user');
        expect(body.data.user).to.be.an('object');
        expect(body.data.token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signin', () => {
  it('should succesffuly sign in the admin if the sign in inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(admin)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        adminToken = body.data.token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.equal(200);
        expect(body.data).to.haveOwnProperty('token');
        expect(body.data).to.haveOwnProperty('user');
        expect(body.data.user).to.be.an('object');
        expect(body.data.token).to.be.a('string');
        done();
      });
  });
});

describe('GET api/v1/car', () => {
  it('should return an empty array with status 204 if carSale records are empty', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set({ authorization: token })
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

describe('POST api/v1/car/', () => {
  it('should create a car sale sale advert if the user inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/car/')
      .set({ authorization: token })
      .send({
        state: 'new',
        price: '500000',
        manufacturer: `${faker.name.firstName()}`,
        model: `${faker.random.words()}`,
        body_type: 'car',
        img_url: 'https://google/hnfn/',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body.status).to.equal(201);
        expect(body.data).to.be.an('object');
        expect(body).to.haveOwnProperty('status' && 'data');
        done();
      });
  });
});

describe('POST api/v1/car/', () => {
  it('should return an unauthorized error if there is no header token', (done) => {
    chai.request(app)
      .post('/api/v1/car/')
      .send({
        state: 'new',
        price: '500,000',
        manufacturer: `${faker.name.firstName()}`,
        model: `${faker.random.words()}`,
        body_type: 'car',
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

describe('POST api/v1/car', () => {
  it('should return an unauthorized error if there is an invalid jwt token', (done) => {
    chai.request(app)
      .post('/api/v1/car/')
      .set({ authorization: 'dvvgfvgdfvd' })
      .send({
        state: 'new',
        price: '500,000',
        manufacturer: `${faker.name.firstName()}`,
        model: `${faker.random.words()}`,
        body_type: 'car',
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

describe('POST api/v1/car/', () => {
  it('should return an error if the user inputs are invalid', (done) => {
    chai.request(app)
      .post('/api/v1/car/')
      .set({ authorization: token })
      .send({
        state: undefined,
        price: undefined,
        manufacturer: undefined,
        model: undefined,
        body_type: undefined,
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

describe('GET api/v1/car', () => {
  it('should return all unsold car sale adverts', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set({ authorization: token })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body).to.haveOwnProperty('status');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        done();
      });
  });
});

describe('GET api/v1/car/body-type', () => {
  it('should return all cars with a specific body type', (done) => {
    chai.request(app)
      .get('/api/v1/car/body-type')
      .set({ authorization: token })
      .send({
        body_type: 'car',
      })
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

describe('GET api/v1/car/state', () => {
  it('should return all cars with a specific car state', (done) => {
    chai.request(app)
      .get('/api/v1/car/state')
      .set({ authorization: token })
      .send({
        state: 'new',
      })
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

describe('GET api/v1/car/:id', () => {
  it('should return a car sale advert with a specific id', (done) => {
    chai.request(app)
      .get('/api/v1/car/1')
      .set({ authorization: token })
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

describe('GET api/v1/car/:id (id is non-existent)', () => {
  it('should return an error if a user attempts to make a request for a non-existent car id', (done) => {
    chai.request(app)
      .get(`/api/v1/car/${faker.random.number() + faker.random.number()}`)
      .set({ authorization: token })
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

describe('PATCH api/v1/car/:id/price', () => {
  it('should update the price of a car sale advert if it exists', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1/price')
      .set({ authorization: adminToken })
      .send({
        price: '5000000',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body).to.haveOwnProperty('status' && 'data');
        done();
      });
  });
});

describe('PATCH api/v1/car/:id/price', () => {
  it('should return an error if the the specified id doesn\'t exist', (done) => {
    chai.request(app)
      .patch('/api/v1/car/64464738384/price')
      .set({ authorization: adminToken })
      .send({
        price: '5000000',
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

describe('PATCH api/v1/car/:id/price', () => {
  it('should return an error if the car price field is empty', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1/price')
      .set({ authorization: adminToken })
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

describe('PATCH api/v1/car/:id/status', () => {
  it('should update the status of a car sale advert if it exists', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1/status')
      .set({ authorization: adminToken })
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
        expect(body).to.haveOwnProperty('status' && 'data');
        done();
      });
  });
});

describe('DELETE api/v1/admin/:id/', () => {
  it('should delete a record by id if it exists', (done) => {
    chai.request(app)
      .delete('/api/v1/admin/1/')
      .set({ authorization: adminToken })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data).to.be.a('string');
        expect(body.data).to.be.equals('Car advert successfully deleted');
        done();
      });
  });
});
