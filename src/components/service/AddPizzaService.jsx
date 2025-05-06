export const AddPizza = () => {
  return fetch(`http://localhost:8088/pizzas`, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
};
