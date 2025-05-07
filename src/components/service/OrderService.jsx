export const createNewOrder = (order) => {
  return fetch('http://localhost:8088/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  }).then((response) => response.json());
};

export const GetAllOrders = () => {
  return fetch(`http://localhost:8088/orders`).then((res) => res.json());
};
