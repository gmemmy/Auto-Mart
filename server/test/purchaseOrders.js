/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../App';

const { expect } = chai;

chai.use(chaiHttp);


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
        body_type: 'car',
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
