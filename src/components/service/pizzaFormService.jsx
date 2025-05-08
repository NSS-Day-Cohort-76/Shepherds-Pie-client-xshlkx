export const addPizzaForm = (savedPizza) => {
  return fetch("http://localhost:8088/pizzas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(savedPizza),
  })
    .then((response) => response.json())
    .then(savedPizza);
};
