export const AddPizza = () => {
  return fetch(`http://localhost:8088/pizzas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
};
