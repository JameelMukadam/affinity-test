import faker from 'faker';

export function getCustomers(num = 10) {
  const customers = [];
  for (let index = 0; index < num; index++) {
    const customer = {
      id: faker.random.uuid(),
      name: faker.name.findName()
    }
    customers.push(customer);
  }
  return customers;
}

export function getOrders(customers, numOrders = 4) {
  const orders = [];
  for (let index = 0; index < numOrders; index++) {
    for (let i = 0; i < customers.length; i++) {
      const order = {
        id: faker.random.uuid(),
        customerId: customers[i].id,
        orderDate: faker.date.between('2020-04-01', '2020-05-04')
      }
      orders.push(order);
    }
  }
  return orders.sort((a, b) => { return b.orderDate - a.orderDate });
}

export function getOrderDetails(orders, numItems = 5) {
  const orderDetails = [];
  for (let index = 0; index < orders.length; index++) {
    for (let i = 0; i < numItems; i++) {
      const orderDetail = {
        id: faker.random.uuid(),
        orderId: orders[index].id,
        quantity: faker.random.number({ min: 1, max: 10 }),
        price: faker.commerce.price(10, 1000, 2),
        itemDescription: faker.commerce.productName()
      }
      orderDetails.push(orderDetail);
    }
  }
  return orderDetails;
}

export function getProducts(numProds = 50) {
  const products = [];
  for (let i = 0; i < numProds; i++) {
    const product = {
      id: faker.random.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(10, 1000, 2)
    }
    products.push(product);
  }
  return products;
}

export function getMockData(numCustomers = 10, numOrders = 4, numItems = 5, numProds = 100) {
  const customers = getCustomers(numCustomers);
  const orders = getOrders(customers, numOrders);
  const orderDetails = getOrderDetails(orders, numItems);
  const products = getProducts(numProds)
  return {
    customers,
    orders,
    orderDetails,
    products
  };
};
