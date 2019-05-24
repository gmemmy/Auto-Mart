import faker from 'faker';

const advertisements = [
  {
    id: 0,
    owner: faker.name.firstName(),
    created_on: faker.date.past(),
    state: faker.random.word(),
    status: faker.random.word(),
    price: faker.finance.amount(),
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: faker.name.word(),
  },

  {
    id: 0,
    owner: faker.name.firstName(),
    created_on: faker.date.past(),
    state: faker.random.word(),
    status: faker.random.word(),
    price: faker.finance.amount(),
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: faker.name.word(),
  },

  {
    id: 0,
    owner: faker.name.firstName(),
    created_on: faker.date.past(),
    state: faker.random.word(),
    status: faker.random.word(),
    price: faker.finance.amount(),
    manufacturer: faker.name.firstName(),
    model: faker.random.words(),
    body_type: faker.name.word(),
  },
];

export default advertisements;
