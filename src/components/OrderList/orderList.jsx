export const OrderList = () => {
  return (
    <article>
      <section>
        <label>Filter Orders by Date</label>
        <input type="date" placeholder="Filter by date" />
      </section>
      <section>
        <div>Order Id: </div>
      </section>
      <section>
        <div>Customer Name: </div>
      </section>
      <section>
        <div>Order Status: </div>
      </section>
      <footer>
        <select name="View Count" id="quantity">
          <option value="default">View Count</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </footer>
    </article>
  );
};

// import React, { useState, useEffect } from "react";

// export const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [viewCount, setViewCount] = useState(25); // Default to showing 25 orders
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch orders from the database (mocked here)
//   useEffect(() => {
//     const fetchOrders = async () => {
//       const response = await fetch("/API/database.json"); // Adjust the path if necessary
//       const data = await response.json();

//       // Enrich orders with customer names
//       const enrichedOrders = data.orders.map((order) => {
//         const customer =
//           data.employees.find((emp) => emp.id === order.employeeId)?.name ||
//           "Unknown";
//         return { ...order, customer };
//       });

//       setOrders(enrichedOrders);
//     };

//     fetchOrders();
//   }, []);

//   // Filter orders by date
//   const filteredOrders = selectedDate
//     ? orders.filter((order) => order.orderDateTime.startsWith(selectedDate))
//     : orders;

//   // Paginate orders
//   const totalPages = Math.ceil(filteredOrders.length / viewCount);
//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * viewCount,
//     currentPage * viewCount
//   );

//   // Handle page navigation
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   return (
//     <article>
//       {/* Filter by Date */}
//       <section>
//         <label>Filter Orders by Date</label>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => {
//             setSelectedDate(e.target.value);
//             setCurrentPage(1); // Reset to the first page when date changes
//           }}
//         />
//       </section>

//       {/* Orders List */}
//       <section>
//         <ul>
//           {paginatedOrders.map((order) => (
//             <li key={order.id}>
//               <strong>ID:</strong> {order.id}, <strong>Customer:</strong>{" "}
//               {order.customer}, <strong>Status:</strong> {order.orderType}
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Pagination Controls */}
//       <section>
//         {totalPages > 1 && (
//           <div>
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </section>

//       {/* Select Menu for View Count */}
//       <footer>
//         <label htmlFor="quantity">View Count</label>
//         <select
//           name="View Count"
//           id="quantity"
//           value={viewCount}
//           onChange={(e) => {
//             setViewCount(Number(e.target.value));
//             setCurrentPage(1); // Reset to the first page when view count changes
//           }}
//         >
//           <option value="25">25</option>
//           <option value="50">50</option>
//           <option value="75">75</option>
//           <option value="100">100</option>
//         </select>
//       </footer>
//     </article>
//   );
// };
