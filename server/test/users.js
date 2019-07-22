/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../App';

const { expect } = chai;

chai.use(chaiHttp);

const user = {
  email: 'gbemmy22@gmail.com',
  first_name: 'Emmanuel',
  last_name: 'Atawodi',
  password: 'Ojonugwa22',
  confirm_password: 'Ojonugwa22',
  address: 'Louisana',
};

const admin = {
  email: 'nuelojay22@gmail.com',
  username: 'gmemmy22',
  first_name: 'Emmanuella',
  last_name: 'Atawodilina',
  password: 'Ojonugwa22',
  confirm_password: '123456789abc',
  address: 'Springville',
  is_admin: true,
};

// eslint-disable-next-line no-unused-vars
let token;
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

// describe('POST api/v1/auth/signup', () => {
//   it('should succesffuly sign up the admin if the inputs are valid', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signup')
//       .send(admin)
//       .end((err, res) => {
//         console.log(res.body);
//         if (err) done();
//         const { body } = res;
//         // eslint-disable-next-line prefer-destructuring
//         adminToken = body.data.token;
//         expect(body).to.be.an('object');
//         expect(body.status).to.be.a('number');
//         expect(body.status).to.equal(200);
//         expect(body.data).to.haveOwnProperty('token');
//         expect(body.data).to.haveOwnProperty('newUser');
//         expect(body.data.existingUser).to.be.an('object');
//         expect(body.data.token).to.be.a('string');
//         done();
//       });
//   });
// });

describe('POST api/v1/auth/signup', () => {
  it('should return an error if sign up inputs are invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
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

describe('POST api/v1/auth/signup', () => {
  it('should return an error if email already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'gmemmy',
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        registered: faker.date.recent(),
        phonenumber: '64674848393',
        password: '74rhnrjfnjirfnjrn',
        confirmPassword: '74rhnrjfnjirfnjrn',
        isadmin: false,
      })
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

describe('POST api/v1/auth/signup', () => {
  it('should return an error if passwords do not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        password: '74rhnrjfnjirfnjrn',
        confirm_password: '74rhnrjfnjirfnjrm',
        address: 'Louisana',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
        expect(body.error).to.equals('Password and Confirm Password do not match');
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
  it('should return an error if the signin inputs are invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
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

describe('POST api/v1/auth/signin', () => {
  it('should return an error if the sign in inputs are empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signin', () => {
  it('should return an error if the sign in password is wrong', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: user.email,
        password: '4gdgggdjjkoanjn0',
      })
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

describe('GET api/v1/admin/users', () => {
  it('should return all users', (done) => {
    chai.request(app)
      .get('/api/v1/admin/users')
      .set({ authorization: adminToken })
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
