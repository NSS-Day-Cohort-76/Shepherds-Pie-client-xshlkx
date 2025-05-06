import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddPizzaOffCanvas } from "../PizzaBuilder/AddPizzaOffCanvas.jsx";
import { EditPizzaOffCanvas } from "../PizzaBuilder/EditPizzaOffCanvas.jsx";
import "./createOrderForm.css";

export const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [pizzas, setPizzas] = useState([]); // State to store pizzas for the order
  const [editingPizza, setEditingPizza] = useState(null); // State to track the pizza being edited

  // Fetch order details
  useEffect(() => {
    fetch(`http://localhost:8088/orders/${id}`)
      .then((response) => response.json())
      .then((data) => setOrder(data));
  }, [id]);

  // Fetch pizzas for the order
  useEffect(() => {
    fetch(`http://localhost:8088/pizzas?orderId=${id}`)
      .then((response) => response.json())
      .then((data) => setPizzas(data));
  }, [id]);

  // Remove a pizza
  const handleRemovePizza = (pizzaId) => {
    if (window.confirm("Are you sure you want to remove this pizza?")) {
      fetch(`http://localhost:8088/pizzas/${pizzaId}`, {
        method: "DELETE",
      })
        .then(() => {
          setPizzas((prevPizzas) =>
            prevPizzas.filter((pizza) => pizza.id !== pizzaId)
          );
        })
        .catch((error) => console.error("Error removing pizza:", error));
    }
  };

  // Open the edit form for a pizza
  const handleEditPizza = (pizza) => {
    setEditingPizza(pizza); // Set the pizza to be edited
  };

  // Update the pizza in the state after editing
  const handlePizzaUpdated = (updatedPizza) => {
    setPizzas((prevPizzas) =>
      prevPizzas.map((pizza) =>
        pizza.id === updatedPizza.id ? updatedPizza : pizza
      )
    );
    setEditingPizza(null); // Close the edit form
  };

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
      <p className="text-black">
        Order Type: {order.isDelivery ? "Delivery" : "Dine-in"}
      </p>

      <h3>Pizzas in this Order</h3>
      <div className="pizzas-list">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-card">
            <p>Size: {pizza.sizeId}</p>
            <p>Cheese: {pizza.cheeseId}</p>
            <p>Sauce: {pizza.sauceId}</p>
            <p>Total Price: ${pizza.totalPrice.toFixed(2)}</p>
            <button onClick={() => handleRemovePizza(pizza.id)}>Remove</button>
            <button onClick={() => handleEditPizza(pizza)}>Edit</button>
          </div>
        ))}
      </div>

      <AddPizzaOffCanvas
        orderId={id}
        onPizzaAdded={(newPizza) =>
          setPizzas((prevPizzas) => [...prevPizzas, newPizza])
        }
      />

      {editingPizza && (
        <EditPizzaOffCanvas
          pizza={editingPizza}
          onClose={() => setEditingPizza(null)}
          onPizzaUpdated={handlePizzaUpdated}
        />
      )}
    </div>
  );
};

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { AddPizzaOffCanvas } from "../PizzaBuilder/AddPizzaOffCanvas.jsx";
// import "./createOrderForm.css";

// export const OrderDetails = () => {
//   const { id } = useParams(); // Get the order ID from the URL
//   const [order, setOrder] = useState(null);
//   const [pizzas, setPizzas] = useState([]); // State to store pizzas for the order

//   // Fetch order details
//   useEffect(() => {
//     fetch(`http://localhost:8088/orders/${id}`)
//       .then((response) => response.json())
//       .then((data) => setOrder(data));
//   }, [id]);

//   // Fetch pizzas for the order
//   useEffect(() => {
//     fetch(`http://localhost:8088/pizzas?orderId=${id}`)
//       .then((response) => response.json())
//       .then((data) => setPizzas(data));
//   }, [id]);

//   // Remove a pizza
//   const handleRemovePizza = (pizzaId) => {
//     if (window.confirm("Are you sure you want to remove this pizza?")) {
//       fetch(`http://localhost:8088/pizzas/${pizzaId}`, {
//         method: "DELETE",
//       })
//         .then(() => {
//           setPizzas((prevPizzas) =>
//             prevPizzas.filter((pizza) => pizza.id !== pizzaId)
//           );
//         })
//         .catch((error) => console.error("Error removing pizza:", error));
//     }
//   };

//   if (!order) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="create-order-wrapper">
//       <h2>Order Details</h2>
//       <p className="text-black">Order ID: {order.id}</p>
//       <p className="text-black">Customer Name: {order.customerName}</p>
//       <p className="text-black">Phone: {order.phone}</p>
//       <p className="text-black">Email: {order.email}</p>
//       <p className="text-black">
//         Order Type: {order.isDelivery ? "Delivery" : "Dine-in"}
//       </p>

//       <h3>Pizzas in this Order</h3>
//       <div className="pizzas-list">
//         {pizzas.map((pizza) => (
//           <div key={pizza.id} className="pizza-card">
//             <p>Size: {pizza.sizeId}</p>
//             <p>Cheese: {pizza.cheeseId}</p>
//             <p>Sauce: {pizza.sauceId}</p>
//             <p>Total Price: ${pizza.totalPrice.toFixed(2)}</p>
//             <button onClick={() => handleRemovePizza(pizza.id)}>Remove</button>
//           </div>
//         ))}
//       </div>

//       <AddPizzaOffCanvas
//         orderId={id}
//         onPizzaAdded={(newPizza) =>
//           setPizzas((prevPizzas) => [...prevPizzas, newPizza])
//         }
//       />
//     </div>
//   );
// };
