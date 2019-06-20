import faker from 'faker';

const purchaseOrder = [
  {
    id: 0,
    buyer: 12,
    car_id: 36,
    amount: faker.finance.amount(),
    status: 'pending',
  },

  {
    id: 0,
    buyer: 24,
    car_id: 36,
    amount: faker.finance.amount(),
    status: 'pending',
  },

  {
    id: 0,
    buyer: 13,
    car_id: 36,
    amount: faker.finance.amount(),
    status: 'pending',
  },
];

export default purchaseOrder;
