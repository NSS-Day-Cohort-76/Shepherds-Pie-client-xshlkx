import { useEffect, useState } from "react";
import "./PizzaForm.css";
export const PizzaForm = ({
  orderId,
  pizza: pizzaProp,
  onClose,
  onPizzaAdded,
  onPizzaUpdated,
}) => {
  const [sizes, setSizes] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [toppings, setToppings] = useState([]);

  const [pizza, setPizza] = useState(
    pizzaProp || {
      sizeId: "",
      cheeseId: "",
      sauceId: "",
      toppings: [],
    }
  );

  useEffect(() => {
    fetch("http://localhost:8088/pizzaSizes")
      .then((res) => res.json())
      .then(setSizes);
    fetch("http://localhost:8088/cheeses")
      .then((res) => res.json())
      .then(setCheeses);
    fetch("http://localhost:8088/sauces")
      .then((res) => res.json())
      .then(setSauces);
    fetch("http://localhost:8088/toppings")
      .then((res) => res.json())
      .then(setToppings);
  }, []);

  const toggleTopping = (id) => {
    setPizza((prev) => ({
      ...prev,
      toppings: prev.toppings.includes(id)
        ? prev.toppings.filter((toppingId) => toppingId !== id)
        : [...prev.toppings, id],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedSize = sizes.find((size) => size.id === pizza.sizeId);
    const baseCost = selectedSize ? selectedSize.baseCost : 0;
    const toppingsCost = pizza.toppings.reduce((total, toppingId) => {
      const topping = toppings.find((t) => t.id === toppingId);
      return total + (topping ? topping.price : 0);
    }, 0);
    const totalPrice = baseCost + toppingsCost;

    const pizzaToSave = { ...pizza, orderId, totalPrice };

    const url = pizza.id
      ? `http://localhost:8088/pizzas/${pizza.id}`
      : "http://localhost:8088/pizzas";
    const method = pizza.id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizzaToSave),
    })
      .then((response) => response.json())
      .then((savedPizza) => {
        if (pizza.id) {
          onPizzaUpdated?.(savedPizza);
        } else {
          onPizzaAdded?.(savedPizza);
        }
        onClose?.();
      })
      .catch((error) => console.error("Error saving pizza:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{pizza.id ? "Edit Your Pizza" : "Build Your Pizza"}</h3>

      <label>Size:</label>
      <select
        value={pizza.sizeId}
        onChange={(event) =>
          setPizza({ ...pizza, sizeId: parseInt(event.target.value) })
        }
        required
      >
        <option value="">Select Size</option>
        {sizes.map((size) => (
          <option key={size.id} value={size.id}>
            {size.name}
          </option>
        ))}
      </select>

      <label>Select Cheese:</label>
      <select
        value={pizza.cheeseId}
        onChange={(event) =>
          setPizza({ ...pizza, cheeseId: parseInt(event.target.value) })
        }
        required
      >
        <option value="">Select Cheese</option>
        {cheeses.map((cheese) => (
          <option key={cheese.id} value={cheese.id}>
            {cheese.name}
          </option>
        ))}
      </select>

      <label>Select Sauce:</label>
      <select
        value={pizza.sauceId}
        onChange={(event) =>
          setPizza({ ...pizza, sauceId: parseInt(event.target.value) })
        }
        required
      >
        <option value="">Select Sauce</option>
        {sauces.map((sauce) => (
          <option key={sauce.id} value={sauce.id}>
            {sauce.name}
          </option>
        ))}
      </select>

      <label>Select Toppings:</label>
      <div className="toppings-list">
        {toppings.map((topping) => (
          <div key={topping.id}>
            <label>
              <input
                type="checkbox"
                checked={pizza.toppings.includes(topping.id)}
                onChange={() => toggleTopping(topping.id)}
              />
              {topping.name} (${topping.price})
            </label>
          </div>
        ))}
      </div>

      <h4>
        Total Price: $
        {sizes.find((size) => size.id === pizza.sizeId)?.baseCost +
          pizza.toppings.reduce((total, toppingId) => {
            const topping = toppings.find((t) => t.id === toppingId);
            return total + (topping ? topping.price : 0);
          }, 0) || 0}
      </h4>

      <button type="submit">{pizza.id ? "Update Pizza" : "Add Pizza"}</button>
    </form>
  );
};

// import { useEffect, useState } from "react";
// import "./PizzaForm.css";

// export const PizzaForm = ({
//   orderId,
//   onClose,
//   onPizzaAdded,
//   onPizzaUpdated,
// }) => {
//   const [sizes, setSizes] = useState([]);
//   const [cheeses, setCheeses] = useState([]);
//   const [sauces, setSauces] = useState([]);
//   const [toppings, setToppings] = useState([]);

//   const [pizza, setPizza] = useState({
//     sizeId: "",
//     cheeseId: "",
//     sauceId: "",
//     toppings: [],
//   });

//   useEffect(() => {
//     fetch("http://localhost:8088/pizzaSizes")
//       .then((res) => res.json())
//       .then(setSizes);

//     fetch("http://localhost:8088/cheeses")
//       .then((res) => res.json())
//       .then(setCheeses);

//     fetch("http://localhost:8088/sauces")
//       .then((res) => res.json())
//       .then(setSauces);

//     fetch("http://localhost:8088/toppings")
//       .then((res) => res.json())
//       .then(setToppings);
//   }, []);

//   const toggleTopping = (id) => {
//     setPizza((prev) => ({
//       ...prev,
//       toppings: prev.toppings.includes(id)
//         ? prev.toppings.filter((toppingId) => toppingId !== id)
//         : [...prev.toppings, id],
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Calculate the total price
//     const selectedSize = sizes.find((size) => size.id === pizza.sizeId);
//     const baseCost = selectedSize ? selectedSize.baseCost : 0;
//     const toppingsCost = pizza.toppings.reduce((total, toppingId) => {
//       const topping = toppings.find((t) => t.id === toppingId);
//       return total + (topping ? topping.price : 0);
//     }, 0);
//     const totalPrice = baseCost + toppingsCost;

//     const pizzaToSave = { ...pizza, orderId, totalPrice };

//     // Determine if this is a POST (create) or PUT (edit) request
//     const url = pizza.id
//       ? `http://localhost:8088/pizzas/${pizza.id}` // PUT for editing
//       : "http://localhost:8088/pizzas"; // POST for creating
//     const method = pizza.id ? "PUT" : "POST";

//     fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(pizzaToSave),
//     })
//       .then((response) => response.json())
//       .then((savedPizza) => {
//         if (pizza.id) {
//           // If editing, notify parent with the updated pizza
//           onPizzaUpdated?.(savedPizza);
//         } else {
//           // If creating, notify parent with the new pizza
//           onPizzaAdded?.(savedPizza);
//         }
//         onClose?.(); // Close the form
//       })
//       .catch((error) => console.error("Error saving pizza:", error));
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h3>Build Your Pizza</h3>

//         {/* Size Dropdown */}
//         <label>Size:</label>
//         <select
//           value={pizza.sizeId}
//           onChange={(event) =>
//             setPizza({ ...pizza, sizeId: parseInt(event.target.value) })
//           }
//           required
//         >
//           <option value="">Select Size</option>
//           {sizes.map((size) => (
//             <option key={size.id} value={size.id}>
//               {size.name}
//             </option>
//           ))}
//         </select>

//         {/* Cheese Dropdown */}
//         <label>Select Cheese:</label>
//         <select
//           value={pizza.cheeseId}
//           onChange={(event) =>
//             setPizza({ ...pizza, cheeseId: parseInt(event.target.value) })
//           }
//           required
//         >
//           <option value="">Select Cheese</option>
//           {cheeses.map((cheese) => (
//             <option key={cheese.id} value={cheese.id}>
//               {cheese.name}
//             </option>
//           ))}
//         </select>

//         {/* Sauce Dropdown */}
//         <label>Select Sauce:</label>
//         <select
//           value={pizza.sauceId}
//           onChange={(event) =>
//             setPizza({ ...pizza, sauceId: parseInt(event.target.value) })
//           }
//           required
//         >
//           <option value="">Select Sauce</option>
//           {sauces.map((sauce) => (
//             <option key={sauce.id} value={sauce.id}>
//               {sauce.name}
//             </option>
//           ))}
//         </select>

//         {/* Toppings CheckBoxes */}
//         <label>Select Toppings:</label>
//         <div className="toppings-list">
//           {toppings.map((topping) => (
//             <div key={topping.id}>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={pizza.toppings.includes(topping.id)}
//                   onChange={() => toggleTopping(topping.id)}
//                 />
//                 {topping.name} (${topping.price})
//               </label>
//             </div>
//           ))}
//         </div>

//         {/* Live Price */}
//         <h4>
//           Total Price: $
//           {sizes.find((size) => size.id === pizza.sizeId)?.baseCost +
//             pizza.toppings.reduce((total, toppingId) => {
//               const topping = toppings.find((t) => t.id === toppingId);
//               return total + (topping ? topping.price : 0);
//             }, 0) || 0}
//         </h4>

//         <button type="submit">Add Pizza</button>
//       </form>
//     </>
//   );
// };
