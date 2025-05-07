import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddPizzaOffCanvas } from "../PizzaBuilder/AddPizzaOffCanvas.jsx";
import { EditPizzaOffCanvas } from "../PizzaBuilder/EditPizzaOffCanvas.jsx";
import "./createOrderForm.css";

export const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const [editingPizza, setEditingPizza] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  // Fetch order details
  useEffect(() => {
    fetch(`http://localhost:8088/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
        setTipAmount(data.tipAmount || 0); // Initialize tip amount from the order
      });
  }, [id]);

  // Fetch pizzas for the order
  useEffect(() => {
    fetch(`http://localhost:8088/pizzas?orderId=${id}`)
      .then((response) => response.json())
      .then((data) => setPizzas(data));
  }, [id]);

  // Fetch available employees
  useEffect(() => {
    fetch("http://localhost:8088/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);
  // Fetch available tables
  useEffect(() => {
    fetch("http://localhost:8088/tables") // Assuming tables are stored in the API
      .then((response) => response.json())
      .then((data) => setTables(data)); // Update the tables state
  }, []);

  // Assign a delivery employee
  const handleAssignDelivery = () => {
    if (!selectedEmployee) {
      alert("Please select an employee to assign the delivery.");
      return;
    }

    const updatedOrder = {
      ...order,
      deliveryEmployeeId: parseInt(selectedEmployee),
      status: "Out for Delivery",
    };

    fetch(`http://localhost:8088/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        setOrder(updatedOrder);
        alert(`Delivery assigned to employee ID: ${selectedEmployee}`);
      })
      .catch((error) => console.error("Error assigning delivery:", error));
  };

  // Assign a table for dine-in orders
  const handleAssignTable = () => {
    if (!selectedTable) {
      alert("Please select a table to assign.");
      return;
    }

    const updatedOrder = {
      ...order,
      tableNumber: parseInt(selectedTable),
      status: "Being Seated",
    };

    fetch(`http://localhost:8088/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        setOrder(updatedOrder);
        alert(`Table ${selectedTable} assigned to the order.`);
      })
      .catch((error) => console.error("Error assigning table:", error));
  };

  // Remove a pizza
  const handleRemovePizza = (pizzaId) => {
    if (window.confirm("Are you sure you want to remove this pizza?")) {
      fetch(`http://localhost:8088/pizzas/${pizzaId}`, {
        method: "DELETE",
      })
        .then(() => {
          setPizzas((prevPizzas) => prevPizzas.filter((pizza) => pizza.id !== pizzaId));
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
      prevPizzas.map((pizza) => (pizza.id === updatedPizza.id ? updatedPizza : pizza))
    );
    setEditingPizza(null); // Close the edit form
  };

  if (!order) {
    return <p>Loading...</p>;
  }

  // Calculate the total price of the order
  const calculateTotalPrice = () => {
    const pizzasTotal = pizzas.reduce((total, pizza) => total + pizza.totalPrice, 0);
    const deliverySurcharge = order.isDelivery ? 5 : 0;
    return pizzasTotal + deliverySurcharge + parseFloat(tipAmount || 0);
  };

  // Cancel the order
  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      fetch(`http://localhost:8088/orders/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          navigate("/orderlist", {
            state: { message: "Order canceled successfully." },
          });
        })
        .catch((error) => console.error("Error canceling order:", error));
    }
  };

  // Handle tip input change
  const handleTipChange = (event) => {
    const newTip = parseFloat(event.target.value) || 0;
    setTipAmount(newTip);

    // Update the tip amount in the database
    const updatedOrder = { ...order, tipAmount: newTip };
    fetch(`http://localhost:8088/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((response) => response.json())
      .then((updatedOrder) => setOrder(updatedOrder))
      .catch((error) => console.error("Error updating tip:", error));
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
      <p className="text-black">Order Type: {order.isDelivery ? "Delivery" : "Dine-in"}</p>

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

      <section>
        <h3>Add Tip</h3>
        <input
          type="text"
          value={tipAmount}
          onChange={handleTipChange}
          placeholder="Enter tip amount"
        />
        <h3>Total Price</h3>
        <p className="text-black">
          ${calculateTotalPrice().toFixed(2)}{" "}
          {order.isDelivery && <span>(Includes $5 delivery surcharge)</span>}
        </p>

        <button className="cancel-order-button" onClick={handleCancelOrder}>
          Cancel Order
        </button>

        <AddPizzaOffCanvas
          orderId={id}
          onPizzaAdded={(newPizza) => setPizzas((prevPizzas) => [...prevPizzas, newPizza])}
        />

        {editingPizza && (
          <EditPizzaOffCanvas
            pizza={editingPizza}
            onClose={() => setEditingPizza(null)}
            onPizzaUpdated={handlePizzaUpdated}
          />
        )}

        {order.isDelivery && (
          <>
            <h3>Assign Delivery</h3>
            <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
              <option value="">Select an Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <button onClick={handleAssignDelivery}>Assign Delivery</button>
          </>
        )}

        {!order.isDelivery && (
          <>
            <h3>Assign Table</h3>
            <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
              <option value="">Select a Table</option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  Table {table.number}
                </option>
              ))}
            </select>
            <button onClick={handleAssignTable}>Assign Table</button>
          </>
        )}
      </section>
    </div>
  );
};
