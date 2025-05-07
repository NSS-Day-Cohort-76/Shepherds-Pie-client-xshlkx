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

    fetch(
      `http://localhost:8088/orders?timestamp_like=${selectedMonth}&_embed=pizzas`
    )
      .then((res) => res.json())
      .then((orders) => {
        // Calculate totals
        const totalOrders = orders.length;
        const totalSales = orders.reduce((sum, order) => {
          return (
            sum +
            order.pizzas.reduce(
              (pizzaSum, pizza) => pizzaSum + (pizza.totalPrice || 0),
              0
            )
          );
        }, 0);
        const averageOrderValue =
          totalOrders > 0 ? totalSales / totalOrders : 0;

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
            cheeseCounts[pizza.cheeseId] =
              (cheeseCounts[pizza.cheeseId] || 0) + 1;
            sauceCounts[pizza.sauceId] = (sauceCounts[pizza.sauceId] || 0) + 1;

            fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizza.id}`)
              .then((res) => res.json())
              .then((toppings) => {
                toppings.forEach((topping) => {
                  toppingCounts[topping.toppingId] =
                    (toppingCounts[topping.toppingId] || 0) + 1;
                });

                const sortedToppings = Object.entries(toppingCounts)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3);

                setPopularItems({
                  size: Object.entries(sizeCounts).sort(
                    (a, b) => b[1] - a[1]
                  )[0],
                  cheese: Object.entries(cheeseCounts).sort(
                    (a, b) => b[1] - a[1]
                  )[0],
                  sauce: Object.entries(sauceCounts).sort(
                    (a, b) => b[1] - a[1]
                  )[0],
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
    <div className="create-order-wrapper">
      <h2>Sales Report</h2>

      {/* Month Selector */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {availableMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      {/* Summary Info */}
      <h3>Summary</h3>
      <ul className="create-order-form">
        <li>Total Orders: {summary.totalOrders}</li>
        <li>Total Sales: ${summary.totalSales.toFixed(2)}</li>
        <li>Average Order Value: ${summary.averageOrderValue.toFixed(2)}</li>
      </ul>

      {/* Daily Breakdown */}
      <h3>Day-by-Day Breakdown</h3>
      <ul className="create-order-form">
        {dailyBreakdown.map(([date, total]) => (
          <li key={date}>
            {date}: ${total.toFixed(2)}
          </li>
        ))}
      </ul>

      {/* Popular Items */}
      <h3>Popular Items</h3>
      <ul className="create-order-form">
        <li onClick={() => handleItemClick(popularItems.size, "Size")}>
          Most Popular Size: {popularItems.size?.[0]} ({popularItems.size?.[1]}{" "}
          orders)
        </li>
        <li onClick={() => handleItemClick(popularItems.cheese, "Cheese")}>
          Most Popular Cheese: {popularItems.cheese?.[0]} (
          {popularItems.cheese?.[1]} orders)
        </li>
        <li onClick={() => handleItemClick(popularItems.sauce, "Sauce")}>
          Most Popular Sauce: {popularItems.sauce?.[0]} (
          {popularItems.sauce?.[1]} orders)
        </li>
        <li>Top 3 Toppings:</li>
        <ul>
          {popularItems.toppings.map(([toppingId, count]) => (
            <li
              key={toppingId}
              onClick={() => handleItemClick([toppingId, count], "Topping")}
            >
              Topping {toppingId}: {count} orders
            </li>
          ))}
        </ul>
      </ul>

      {/* Detailed Breakdown */}
      {detailedBreakdown && (
        <div className="create-order-form">
          <h3>Detailed Breakdown</h3>
          <p>
            {detailedBreakdown.type}: {detailedBreakdown.name}
          </p>
          <p>Orders: {detailedBreakdown.count}</p>
          <p>Percentage of Total Orders: {detailedBreakdown.percentage}%</p>
        </div>
      )}
    </div>
  );
};

// import { useEffect, useState } from 'react';

// export const Reports = () => {
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [availableMonths, setAvailableMonths] = useState([]);
//   const [summary, setSummary] = useState({
//     totalOrders: 0,
//     totalSales: 0,
//     averageOrderValue: 0,
//   });
//   const [dailyBreakdown, setDailyBreakdown] = useState([]);

//   // Fetch available months
//   useEffect(() => {
//     fetch('http://localhost:8088/orders')
//       .then((res) => res.json())
//       .then((orders) => {
//         const uniqueMonths = Array.from(
//           new Set(orders.map((order) => order.timestamp.slice(0, 7)))
//         );
//         setAvailableMonths(uniqueMonths);
//         setSelectedMonth(uniqueMonths[0] || '');
//       });
//   }, []);

//   // Fetch orders for the selected month
//   useEffect(() => {
//     if (!selectedMonth) return;

//     fetch(
//       `http://localhost:8088/orders?timestamp_like=${selectedMonth}&_embed=pizzas`
//     )
//       .then((res) => res.json())
//       .then((orders) => {
//         // Calculate totals
//         const totalOrders = orders.length;
//         const totalSales = orders.reduce((sum, order) => {
//           return (
//             sum +
//             order.pizzas.reduce(
//               (pizzaSum, pizza) => pizzaSum + (pizza.totalPrice || 0),
//               0
//             )
//           );
//         }, 0);
//         const averageOrderValue =
//           totalOrders > 0 ? totalSales / totalOrders : 0;

//         setSummary({
//           totalOrders,
//           totalSales,
//           averageOrderValue,
//         });

//         // Daily breakdown
//         const dailySales = {};
//         orders.forEach((order) => {
//           const date = new Date(order.timestamp).toDateString();
//           const orderTotal = order.pizzas.reduce(
//             (pizzaSum, pizza) => pizzaSum + (pizza.totalPrice || 0),
//             0
//           );
//           dailySales[date] = (dailySales[date] || 0) + orderTotal;
//         });

//         setDailyBreakdown(Object.entries(dailySales));
//       });
//   }, [selectedMonth]);

//   return (
//     <div>
//       <h2>Sales Report</h2>

//       {/* Month Selector */}
//       <select
//         value={selectedMonth}
//         onChange={(e) => setSelectedMonth(e.target.value)}
//       >
//         {availableMonths.map((month) => (
//           <option key={month} value={month}>
//             {month}
//           </option>
//         ))}
//       </select>

//       {/* Summary Info */}
//       <h3>Summary</h3>
//       <ul>
//         <li>Total Orders: {summary.totalOrders}</li>
//         <li>Total Sales: ${summary.totalSales.toFixed(2)}</li>
//         <li>Average Order Value: ${summary.averageOrderValue.toFixed(2)}</li>
//       </ul>

//       {/* Daily Breakdown */}
//       <h3>Day-by-Day Breakdown</h3>
//       <ul>
//         {dailyBreakdown.map(([date, total]) => (
//           <li key={date}>
//             {date}: ${total.toFixed(2)}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
