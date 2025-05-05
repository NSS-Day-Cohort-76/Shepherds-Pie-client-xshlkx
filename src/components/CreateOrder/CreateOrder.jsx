import { useState } from "react";
import { Order } from "../OrderList/Order.jsx";
import { useNavigate } from "react-router-dom";

export const CreateOrder = () => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState("");

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 200) + 1;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      id: generateUniqueId(),
      date,
      name,
      phone,
      orderType,
    };

    console.log(order);
    useNavigate("/orderdetails");
  };

  return (
    <div className="create-order-container">
      <article className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <Order
              name={name}
              phone={phone}
              setName={setName}
              setPhone={setPhone}
              date={date}
              setDate={setDate}
              orderType={orderType}
              setOrderType={setOrderType}
            />
          </div>
          <footer>
            <button type="submit">Save Order</button>
          </footer>
        </form>
      </article>
    </div>
  );
};
