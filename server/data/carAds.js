import faker from 'faker';

const advertisements = [
  {
    id: 0,
    owner: 10,
    created_on: faker.date.past(),
    state: 'new',
    status: 'Available',
    price: '500,000',
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: 'car',
  },

  {
    id: 1,
    owner: 10,
    created_on: faker.date.past(),
    state: 'used',
    status: 'sold',
    price: '200,000',
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: 'truck',
  },

  {
    id: 2,
    owner: 10,
    created_on: faker.date.past(),
    state: 'new',
    status: 'Available',
    price: '100,000',
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: 'trailer',
  },
];

export default advertisements;
