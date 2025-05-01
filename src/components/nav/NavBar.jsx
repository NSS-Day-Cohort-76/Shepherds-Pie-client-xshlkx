import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/OrderList">Order List</Link>
      </li>
      <li className="navbar-item">
        <Link to="/reports">Reports</Link>
      </li>
      <li className="navbar-item">
        <Link to="/employees">Employees</Link>
      </li>
      <li className="navbar-item">
        <Link to="/createorder">Create Order</Link>
      </li>

      {localStorage.getItem("pizza_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("pizza_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
