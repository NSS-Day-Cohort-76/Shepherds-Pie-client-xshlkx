import { Outlet, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "../components/nav/NavBar.jsx";
import { Welcome } from "../welcome/Welcome.jsx";
import { OrderList } from "../components/OrderList/orderList.jsx";
import { Reports } from "../components/Reports/Reports.jsx";
import { CreateOrder } from "../components/CreateOrder/CreateOrder.jsx";
import { EmployeeList } from "../components/Employees/EmployeesList.jsx";
import { EmployeeDetails } from "../components/Employees/EmployeeDetails.jsx";
import { EmployeeForm } from "../components/forms/EmployeeForm.jsx";
import { OrderDetails } from "../components/CreateOrder/OrderDetails.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localPizzaUser = localStorage.getItem("pizza_user");
    if (localPizzaUser) {
      const pizzaUserObject = JSON.parse(localPizzaUser);
      setCurrentUser(pizzaUserObject);
    } else {
      setCurrentUser(null); // Or handle it appropriately
    }
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
        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path=":employeeId" element={<EmployeeDetails />} />
        </Route>
        <Route
          path="profile"
          element={<EmployeeForm currentUser={currentUser} />}
        />

        <Route path="createorder" element={<CreateOrder />} />
        <Route path="orderdetails/:id" element={<OrderDetails />} />
      </Route>
    </Routes>
  );
};
