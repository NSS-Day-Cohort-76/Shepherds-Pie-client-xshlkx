import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAllOrders } from "../service/OrderService.jsx";
import "./orderList.css";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [viewCount, setViewCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const message = location.state?.message;
  useEffect(() => {
    GetAllOrders().then(setOrders);
  }, []);

  const filteredOrders = selectedDate
    ? orders.filter((order) => order.timestamp.startsWith(selectedDate))
    : orders;

  const totalPages = Math.ceil(filteredOrders.length / viewCount);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * viewCount,
    currentPage * viewCount
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <article>
      <section>
        <label className="filter-label">Filter Orders by Date</label>
        <input
          className="calendar-input"
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setCurrentPage(1);
          }}
        />
      </section>
      <div className="orders-container">
        {paginatedOrders.map((order) => (
          <Link
            to={`/orderdetails/${order.id}`} // Redirect to the OrderDetails page
            key={order.id}
            className="order-link">
            <section className="order-card">
              <section>
                <div>Order Id: </div>
                {order.id}
              </section>
              <section>
                <div>
                  Customer Name: <span>{order.customerName}</span>
                </div>
              </section>
              <section>
                <div>
                  Order Status:{" "}
                  <span>{order.isDelivery ? "Out for delivery" : "Being Seated"}</span>
                </div>
              </section>
            </section>
          </Link>
        ))}
      </div>
      <section className="pagination">
        {totalPages > 1 && (
          <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </section>
      <footer>
        <select
          className="view-count-select"
          aria-label="View Count"
          name="View Count"
          id="quantity"
          value={viewCount}
          onChange={(e) => {
            setViewCount(Number(e.target.value)); // Update the number of orders to display
            setCurrentPage(1); // Reset to the first page when view count changes
          }}>
          <option value="default">View Count</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </footer>
      <div>
        {message && <p className="confirmation-message">{message}</p>}
        {/* Rest of the OrderList code */}
      </div>
    </article>
  );
};

// import { useEffect } from "react";
// import { useState } from "react";
// import { GetAllOrders } from "../service/OrderService.jsx";
// import "./orderList.css";
// export const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [viewCount, setViewCount] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     GetAllOrders().then(setOrders);
//   }, []);

//   const filteredOrders = selectedDate
//     ? orders.filter((order) => order.timestamp.startsWith(selectedDate))
//     : orders;

//   const totalPages = Math.ceil(filteredOrders.length / viewCount);
//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * viewCount,
//     currentPage * viewCount
//   );

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   return (
//     <article>
//       <section>
//         <label>Filter Orders by Date</label>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => {
//             setSelectedDate(e.target.value);
//             setCurrentPage(1);
//           }}
//         />
//       </section>
//       <div className="orders-container">
//         {paginatedOrders.map((order) => {
//           return (
//             <section key={order.id} className="order-card">
//               <section>
//                 <div>Order Id: </div>
//                 {order.id}
//               </section>
//               <section>
//                 <div>
//                   Customer Name: <span>{order.customerName}</span>{" "}
//                 </div>
//               </section>
//               <section>
//                 <div>
//                   Order Status:{" "}
//                   <span>
//                     {order.orderType ? "Being Seated" : "Out for delivery"}
//                   </span>
//                 </div>
//               </section>
//             </section>
//           );
//         })}
//       </div>
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
//       <footer>
//         <select
//           name="View Count"
//           id="quantity"
//           value={viewCount}
//           onChange={(e) => {
//             setViewCount(Number(e.target.value)); // Update the number of orders to display
//             setCurrentPage(1); // Reset to the first page when view count changes
//           }}
//         >
//           <option value="default">View Count</option>
//           <option value="5">5</option>
//           <option value="10">10</option>
//           <option value="15">15</option>
//           <option value="20">20</option>
//         </select>
//       </footer>
//     </article>
//   );
// };
