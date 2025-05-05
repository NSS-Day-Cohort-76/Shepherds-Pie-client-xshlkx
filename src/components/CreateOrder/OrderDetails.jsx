import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./createOrderForm.css";
import Form from "react-bootstrap/Form";

export const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8088/orders/${id}`)
      .then((response) => response.json())
      .then((data) => setOrder(data));
  }, [id]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="create-order-wrapper">
      <h2>Order Details</h2>
      <p className="text-black">Order ID: {order.id}</p>
      <p className="text-black">Customer Name: {order.customerName}</p>
      <p className="text-black">Phone: {order.phone}</p>
      <p className="text-black">Email: {order.email}</p>
      <p className="text-black">Order Type: {order.isDelivery ? "Delivery" : "Dine-in"}</p>
    </div>
  );
};
