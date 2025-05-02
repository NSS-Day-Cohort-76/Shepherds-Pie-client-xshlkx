import { Outlet, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "../components/nav/NavBar.jsx";
import { Welcome } from "../welcome/Welcome.jsx";
import { OrderList } from "../components/OrderList/orderList.jsx";
import { Reports } from "../components/Reports/Reports.jsx";
import { CreateOrder } from "../components/CreateOrder/CreateOrder.jsx";
import { EmployeeList } from "../components/Employees/EmployeesList.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localPizzaUser = localStorage.getItem("pizza_user");
    const pizzaUserObject = JSON.parse(localPizzaUser);

    setCurrentUser(pizzaUserObject);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="reports" element={<Reports />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="createorder" element={<CreateOrder />} />
      </Route>
    </Routes>
  );
};
