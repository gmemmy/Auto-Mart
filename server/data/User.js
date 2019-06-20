import faker from 'faker';

const Users = [
  {
    id: 0,
    email: faker.internet.email(),
    username: faker.name.random(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.random.uuid(),
    address: faker.address.latitude(),
    isAdmin: faker.random.boolean(),
  },

  {
    id: 0,
    email: faker.internet.email(),
    username: faker.name.random(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.random.uuid(),
    address: faker.address.latitude(),
    isAdmin: faker.random.boolean(),
  },

  {
    id: 0,
    email: faker.name.findName(),
    username: faker.name.random(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.random.uuid(),
    address: faker.address.latitude(),
    isAdmin: faker.random.boolean(),
  },
];

export default Users;
