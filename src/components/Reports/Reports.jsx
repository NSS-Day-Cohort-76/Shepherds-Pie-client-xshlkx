import { useEffect, useState } from "react";
import "./Reports.css";
export const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [availableMonths, setAvailableMonths] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalSales: 0,
    averageOrderValue: 0,
  });
  const [dailyBreakdown, setDailyBreakdown] = useState([]);
  const [popularItems, setPopularItems] = useState({
    size: null,
    cheese: null,
    sauce: null,
    toppings: [],
  });
  const [detailedBreakdown, setDetailedBreakdown] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [toppings, setToppings] = useState([]);

  // Fetch sizes, cheeses, and toppings
  useEffect(() => {
    fetch("http://localhost:8088/sizes")
      .then((res) => res.json())
      .then(setSizes);

    fetch("http://localhost:8088/cheeses")
      .then((res) => res.json())
      .then(setCheeses);

    fetch("http://localhost:8088/toppings")
      .then((res) => res.json())
      .then(setToppings);
  }, []);
  // Fetch available months
  useEffect(() => {
    fetch("http://localhost:8088/orders")
      .then((res) => res.json())
      .then((orders) => {
        const uniqueMonths = Array.from(
          new Set(orders.map((order) => order.timestamp.slice(0, 7)))
        );
        setAvailableMonths(uniqueMonths);
        setSelectedMonth(uniqueMonths[0] || "");
      });
  }, []);

  // Fetch orders for the selected month
  useEffect(() => {
    if (!selectedMonth) return;

    fetch(`http://localhost:8088/orders?timestamp_like=${selectedMonth}&_embed=pizzas`)
      .then((res) => res.json())
      .then((orders) => {
        // Calculate totals
        const totalOrders = orders.length;
        const totalSales = orders.reduce((sum, order) => {
          return (
            sum + order.pizzas.reduce((pizzaSum, pizza) => pizzaSum + (pizza.totalPrice || 0), 0)
          );
        }, 0);
        const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

        setSummary({
          totalOrders,
          totalSales,
          averageOrderValue,
        });

        // Daily breakdown
        const dailySales = {};
        orders.forEach((order) => {
          const date = new Date(order.timestamp).toDateString();
          const orderTotal = order.pizzas.reduce(
            (pizzaSum, pizza) => pizzaSum + (pizza.totalPrice || 0),
            0
          );
          dailySales[date] = (dailySales[date] || 0) + orderTotal;
        });

        setDailyBreakdown(Object.entries(dailySales));

        // Calculate popular items
        const sizeCounts = {};
        const cheeseCounts = {};
        const sauceCounts = {};
        const toppingCounts = {};

        orders.forEach((order) => {
          order.pizzas.forEach((pizza) => {
            sizeCounts[pizza.sizeId] = (sizeCounts[pizza.sizeId] || 0) + 1;
            cheeseCounts[pizza.cheeseId] = (cheeseCounts[pizza.cheeseId] || 0) + 1;
            sauceCounts[pizza.sauceId] = (sauceCounts[pizza.sauceId] || 0) + 1;

            fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizza.id}`)
              .then((res) => res.json())
              .then((toppings) => {
                toppings.forEach((topping) => {
                  toppingCounts[topping.toppingId] = (toppingCounts[topping.toppingId] || 0) + 1;
                });

                const sortedToppings = Object.entries(toppingCounts)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3);

                setPopularItems({
                  size: Object.entries(sizeCounts).sort((a, b) => b[1] - a[1])[0],
                  cheese: Object.entries(cheeseCounts).sort((a, b) => b[1] - a[1])[0],
                  sauce: Object.entries(sauceCounts).sort((a, b) => b[1] - a[1])[0],
                  toppings: sortedToppings,
                });
              });
          });
        });
      });
  }, [selectedMonth]);

  const handleItemClick = (item, type) => {
    const totalOrders = summary.totalOrders;
    const percentage = ((item[1] / totalOrders) * 100).toFixed(2);

    setDetailedBreakdown({
      type,
      name: item[0],
      count: item[1],
      percentage,
    });
  };

  return (
    <div className="sales-reports-wrapper">
      <div className="sales-reports-header">
        <h2 className="form-reports-title text-center mb-4">SALES REPORTS 💰</h2>

        {/* Month Selector */}
        <select
          className="calendar"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}>
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      {/* Summary Info */}
      {/* <div className="sales-reports-summary"> */}
      <div className="sales-reports-breakdown">
        <h3>Summary</h3>
        <table className="table table-sm table-striped">
          <tbody>
            <tr>
              <td>Total Orders</td>
              <td>{summary.totalOrders}</td>
            </tr>
            <tr>
              <td>Total Sales</td>
              <td>${summary.totalSales.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Average Order Value</td>
              <td>${summary.averageOrderValue.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="sales-reports-breakdown">
        <h3>Day-by-Day Breakdown</h3>
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {dailyBreakdown.map(([date, total]) => (
              <tr key={date}>
                <td>{date}</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sales-reports-breakdown">
        <h3>Popular Items</h3>
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>Category</th>
              <th>Most Popular</th>
              <th># of Orders</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => handleItemClick(popularItems.size, "Size")}>
              <td>Size</td>
              <td>{popularItems.size?.[0]}</td>
              <td>{popularItems.size?.[1]}</td>
            </tr>
            <tr onClick={() => handleItemClick(popularItems.cheese, "Cheese")}>
              <td>Cheese</td>
              <td>{popularItems.cheese?.[0]}</td>
              <td>{popularItems.cheese?.[1]}</td>
            </tr>
            <tr onClick={() => handleItemClick(popularItems.sauce, "Sauce")}>
              <td>Sauce</td>
              <td>{popularItems.sauce?.[0]}</td>
              <td>{popularItems.sauce?.[1]}</td>
            </tr>
            {popularItems.toppings.map(([toppingId, count]) => (
              <tr key={toppingId} onClick={() => handleItemClick([toppingId, count], "Topping")}>
                <td>Topping</td>
                <td>{toppingId}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {detailedBreakdown && (
          <div className="sales-reports-breakdown">
            <h3>Detailed Breakdown</h3>
            <table className="table table-bordered table-light">
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>{detailedBreakdown.type}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{detailedBreakdown.name}</td>
                </tr>
                <tr>
                  <td>Orders</td>
                  <td>{detailedBreakdown.count}</td>
                </tr>
                <tr>
                  <td>Percentage of Total Orders</td>
                  <td>{detailedBreakdown.percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
// export default Reports;
