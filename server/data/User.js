import faker from 'faker';

const User = [
  {
    id: 0,
    email: faker.name.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: faker.random.password(),
    address: faker.address.latitude(),
    is_admin: faker.random.boolean(),
  },

  {
    id: 0,
    email: faker.name.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: faker.random.password(),
    address: faker.address.latitude(),
    is_admin: faker.random.boolean(),
  },

  {
    id: 0,
    email: faker.name.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: faker.random.password(),
    address: faker.address.latitude(),
    is_admin: faker.random.boolean(),
  },
];

export default User;
