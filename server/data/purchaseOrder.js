import faker from 'faker';

const purchaseOrder = [
  {
    id: 0,
    buyer: faker.name.firstName(),
    car_id: 36,
    amount: faker.finance.amount(),
    status: 'pending',
  },

  {
    id: 0,
    buyer: faker.name.firstName(),
    car_id: 36,
    amount: faker.finance.amount(),
    status: 'pending',
  },

  {
    id: 0,
    buyer: faker.name.firstName(),
    car_id: 36,
    amount: faker.finance.amount(),
    status: 'pending',
  },
];

export default purchaseOrder;
