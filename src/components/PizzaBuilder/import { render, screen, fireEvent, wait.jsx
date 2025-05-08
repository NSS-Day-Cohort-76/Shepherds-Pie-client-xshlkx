import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PizzaForm } from "./PizzaForm";

// filepath: src/components/PizzaBuilder/PizzaForm.test.jsx

describe("PizzaForm Component", () => {
  const mockSizes = [
    { id: 1, name: "Small", baseCost: 8 },
    { id: 2, name: "Medium", baseCost: 10 },
  ];
  const mockCheeses = [{ id: 1, name: "Mozzarella", price: 2 }];
  const mockSauces = [{ id: 1, name: "Tomato", price: 1 }];
  const mockToppings = [
    { id: 1, name: "Pepperoni", price: 1.5 },
    { id: 2, name: "Mushrooms", price: 1 },
  ];

  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes("pizzaSizes"))
        return Promise.resolve({ json: () => Promise.resolve(mockSizes) });
      if (url.includes("cheeses"))
        return Promise.resolve({ json: () => Promise.resolve(mockCheeses) });
      if (url.includes("sauces"))
        return Promise.resolve({ json: () => Promise.resolve(mockSauces) });
      if (url.includes("toppings"))
        return Promise.resolve({ json: () => Promise.resolve(mockToppings) });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with all inputs", async () => {
    render(<PizzaForm orderId={1} onClose={jest.fn()} onPizzaAdded={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("Build Your Pizza")).toBeInTheDocument();
      expect(screen.getByLabelText("Size:")).toBeInTheDocument();
      expect(screen.getByLabelText("Select Cheese:")).toBeInTheDocument();
      expect(screen.getByLabelText("Select Sauce:")).toBeInTheDocument();
      expect(screen.getByText("Select Toppings:")).toBeInTheDocument();
    });
  });

  it("updates pizza state when inputs are changed", async () => {
    render(<PizzaForm orderId={1} onClose={jest.fn()} onPizzaAdded={jest.fn()} />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText("Size:"), { target: { value: "1" } });
      fireEvent.change(screen.getByLabelText("Select Cheese:"), { target: { value: "1" } });
      fireEvent.change(screen.getByLabelText("Select Sauce:"), { target: { value: "1" } });
      fireEvent.click(screen.getByLabelText("Pepperoni ($1.5)"));
    });

    expect(screen.getByLabelText("Size:").value).toBe("1");
    expect(screen.getByLabelText("Select Cheese:").value).toBe("1");
    expect(screen.getByLabelText("Select Sauce:").value).toBe("1");
    expect(screen.getByLabelText("Pepperoni ($1.5)").checked).toBe(true);
  });

  it("calculates the total price correctly", async () => {
    render(<PizzaForm orderId={1} onClose={jest.fn()} onPizzaAdded={jest.fn()} />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText("Size:"), { target: { value: "2" } }); // Medium ($10)
      fireEvent.change(screen.getByLabelText("Select Cheese:"), { target: { value: "1" } }); // Mozzarella ($2)
      fireEvent.change(screen.getByLabelText("Select Sauce:"), { target: { value: "1" } }); // Tomato ($1)
      fireEvent.click(screen.getByLabelText("Pepperoni ($1.5)")); // Topping ($1.5)
    });

    const totalPrice = 10 + 2 + 1 + 1.5; // Medium + Mozzarella + Tomato + Pepperoni
    expect(screen.getByText(`Total Price: $${totalPrice.toFixed(2)}`)).toBeInTheDocument();
  });

  it("submits the form with correct payload", async () => {
    const mockOnPizzaAdded = jest.fn();
    const mockOnClose = jest.fn();

    render(<PizzaForm orderId={1} onClose={mockOnClose} onPizzaAdded={mockOnPizzaAdded} />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText("Size:"), { target: { value: "1" } });
      fireEvent.change(screen.getByLabelText("Select Cheese:"), { target: { value: "1" } });
      fireEvent.change(screen.getByLabelText("Select Sauce:"), { target: { value: "1" } });
      fireEvent.click(screen.getByLabelText("Pepperoni ($1.5)"));
    });

    fireEvent.submit(screen.getByRole("button", { name: /add pizza/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:8088/pizzas", expect.any(Object));
      expect(mockOnPizzaAdded).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
