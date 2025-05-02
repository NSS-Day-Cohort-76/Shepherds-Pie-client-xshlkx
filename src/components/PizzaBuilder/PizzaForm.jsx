import { useEffect, useState } from 'react';
import './PizzaForm.css';

export const PizzaForm = ({ orderId, onClose, onPizzaAdded }) => {
  const [sizes, setSizes] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [toppings, setToppings] = useState([]);

  const [pizza, setPizza] = useState({
    sizeId: '',
    cheeseId: '',
    sauceId: '',
    toppings: [],
  });

  useEffect(() => {
    fetch('http://localhost:8088/pizzaSizes')
      .then((res) => res.json())
      .then(setSizes);

    fetch('http://localhost:8088/cheeses')
      .then((res) => res.json())
      .then(setCheeses);

    fetch('http://localhost:8088/sauces')
      .then((res) => res.json())
      .then(setSauces);

    fetch('http://localhost:8088/toppings')
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
    console.log('pizza submitted:', pizza);

    // need to add save logic here

    onPizzaAdded?.(pizza);
    onClose?.();
  };

  return (
    <>
      {/*
      <div className="pizza-preview-container">
        <img
          src="/images/pizza/crust.png"
          alt="Pizza crust"
          className="pizza-layer"
        />

        {pizza.toppings.includes(1) && (
          <img
            src="/images/pizza/sausage.png"
            alt="Sausage"
            className="pizza-layer"
          />
        )}
        {pizza.toppings.includes(2) && (
          <img
            src="/images/pizza/pepperoni.png"
            alt="Pepperoni"
            className="pizza-layer"
          />
        )}
        {pizza.toppings.includes(3) && (
          <img
            src="/images/pizza/mushroom.png"
            alt="Mushroom"
            className="pizza-layer"
          />
        )}

    
      </div>
 */}
      <form onSubmit={handleSubmit}>
        <h3>Build Your Pizza</h3>

        {/* Size Dropdown */}
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

        {/* Cheese Dropdown */}
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

        {/* Sauce Dropdown */}
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

        {/* Toppings CheckBoxes */}
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

        {/* Live Price */}
        {/*   <h4>Total Price: ${price}</h4> */}

        {/* Submit Button */}

        <button type="submit">Add Pizza</button>
      </form>
    </>
  );
};
