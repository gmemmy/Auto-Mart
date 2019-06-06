import faker from 'faker';

const advertisements = [
  {
    id: 0,
    owner: faker.name.firstName(),
    created_on: faker.date.past(),
    state: 'unsold',
    status: 'Available',
    price: faker.finance.amount(),
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: faker.random.word(),
  },

  {
    id: 1,
    owner: faker.name.firstName(),
    created_on: faker.date.past(),
    state: 'unsold',
    status: 'Available',
    price: faker.finance.amount(),
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: faker.random.word(),
  },

  {
    id: 2,
    owner: faker.name.firstName(),
    created_on: faker.date.past(),
    state: 'sold',
    status: 'Unavailable',
    price: faker.finance.amount(),
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: faker.random.word(),
  },
];

export default advertisements;
