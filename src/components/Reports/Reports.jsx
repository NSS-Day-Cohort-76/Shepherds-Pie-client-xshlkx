import { useEffect, useState } from 'react';

export const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [availableMonths, setAvailableMonths] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalSales: 0,
    averageOrderValue: 0,
  });
  const [dailyBreakdown, setDailyBreakdown] = useState([]);

  // Fetch available months
  useEffect(() => {
    fetch('http://localhost:8088/orders')
      .then((res) => res.json())
      .then((orders) => {
        const uniqueMonths = Array.from(
          new Set(orders.map((order) => order.timestamp.slice(0, 7)))
        );
        setAvailableMonths(uniqueMonths);
        setSelectedMonth(uniqueMonths[0] || '');
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
      });
  }, [selectedMonth]);

  return (
    <div>
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
      <ul>
        <li>Total Orders: {summary.totalOrders}</li>
        <li>Total Sales: ${summary.totalSales.toFixed(2)}</li>
        <li>Average Order Value: ${summary.averageOrderValue.toFixed(2)}</li>
      </ul>

      {/* Daily Breakdown */}
      <h3>Day-by-Day Breakdown</h3>
      <ul>
        {dailyBreakdown.map(([date, total]) => (
          <li key={date}>
            {date}: ${total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};
