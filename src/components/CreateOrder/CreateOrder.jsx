// import { AddPizzaOffCanvas } from '../PizzaBuilder/AddPizzaOffCanvas';
import "../CreateOrder/createOrderForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createNewOrder } from "../service/OrderService.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import the getCreatOrder function from the OrderService
// create temporary object to hold the order data
// store each input in a state variable
// create a function to handle the form submission
// send POST request to the API when "Save Order" button is clicked

export const CreateOrder = () => {
  const [order, setOrder] = useState({
    customerName: "",
    phone: "",
    email: "",
    isDelivery: null,
    timestamp: new Date(),
    status: "",
  });

  const navigate = useNavigate();

  const handleCreateOrder = (event) => {
    event.preventDefault();

    createNewOrder(order).then((createdOrder) => {
      if (createdOrder) {
        setOrder({
          customerName: "",
          phone: "",
          email: "",
          isDelivery: false,
          timestamp: "",
          status: "",
        });

        navigate(`/orderdetails/${createdOrder.id}`);
      } else {
        window.alert("Error creating order");
      }
    });
  };

  const updateOrder = (event) => {
    const { name, value, type, checked } = event.target;

    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <div className="create-order-wrapper">
        <h2 className="form-title text-center mb-4">Let’s Bake This Order 🍕</h2>
        <div className="create-order-form mx-auto">
          <Form onSubmit={handleCreateOrder}>
            <Form.Group className="form-input">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="customer name"
                name="customerName"
                value={order.customerName}
                onChange={updateOrder}
                required
              />
            </Form.Group>

            <Form.Group className="form-input">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="customer email"
                name="email"
                value={order.email}
                onChange={updateOrder}
                required
              />
            </Form.Group>

            <Form.Group className="form-input">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="customer phone"
                name="phone"
                value={order.phone}
                onChange={updateOrder}
                required
              />
            </Form.Group>

            <div className="checkboxes">
              <Form.Group className="checkbox-label d-flex">
                <Form.Check
                  className="delivery-box me-3"
                  type="radio"
                  label="Delivery"
                  name="isDelivery"
                  checked={order.isDelivery === true}
                  onChange={() => setOrder({ ...order, isDelivery: true })}
                />
                <Form.Check
                  className="dine-in-box"
                  type="radio"
                  label="Dine-in"
                  name="isDelivery"
                  checked={order.isDelivery === false}
                  onChange={() => setOrder({ ...order, isDelivery: false })}
                />
              </Form.Group>
            </div>

            <Button className="save-order-button" type="submit">
              Save Order
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

/* /* /* <div className="create-order-form"> */
/* <label htmlFor="customer-name"></label>
        <input
          type="text"
          placeholder="customer name"
          id="customer-name"
          name="customer-name"
          required
        />

        <label htmlFor="customer-email"></label>
        <input
          type="email"
          placeholder="email"
          id="customer-email"
          name="customer-email"
          required
        />

        <label htmlFor="customer-phone"></label>
        <input type="tel" placeholder="phone" id="customer-phone" name="customer-phone" required />
      </div>
      <input type="checkbox" id="Delivery" name="Delivery" />

      <button type="submit">Save Order</button>
      <p>Order ID</p> */
// /* </div>

// */} */}
