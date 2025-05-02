import { useEffect, useState } from "react";
import { GetAllOrders } from "../service/OrdersService.jsx";
import { Order } from "./Order.jsx";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    GetAllOrders().then(setOrders);
  }, []);
  return (
    <article className="container">
      {orders.map((order) => {
        return (
          <div>
            <Order order={order} key={order.id} />;
          </div>
        );
      })}
    </article>
  );
};
