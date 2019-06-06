import faker from 'faker';

const advertisements = [
  {
    id: 0,
    owner: faker.name.firstName(),
    created_on: faker.date.past(),
    state: 'new',
    status: 'Available',
    price: faker.finance.amount(),
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: 'car',
  },

  {
    id: 1,
    owner: faker.name.firstName(),
    created_on: faker.date.past(),
    state: 'used',
    status: 'sold',
    price: faker.finance.amount(),
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: 'truck',
  },

  {
    id: 2,
    owner: faker.name.firstName(),
    created_on: faker.date.past(),
    state: 'new',
    status: 'Available',
    price: faker.finance.amount(),
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: 'trailer',
  },
];

export default advertisements;
