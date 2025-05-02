import { AddPizzaOffCanvas } from '../PizzaBuilder/AddPizzaOffCanvas';

export const CreateOrder = () => {
  return (
    <div className="create-order-container">
      <h2>Create a New Order</h2>

      {/* Add Pizza Offcanvas Button from React Bootstrap */}
      <AddPizzaOffCanvas orderId={1} />
    </div>
  );
};
