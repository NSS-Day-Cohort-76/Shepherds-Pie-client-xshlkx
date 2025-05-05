import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#C03221" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          Jake N’ Bakes
        </Link>
        {/* Add a toggle button for the hamburger menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/OrderList">
                ORDER LIST
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/reports">
                REPORTS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/employees">
                EMPLOYEES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/createorder">
                CREATE ORDER
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/profile">
                PROFILE
              </Link>
            </li>
            {localStorage.getItem("pizza_user") && (
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  to=""
                  onClick={() => {
                    localStorage.removeItem("pizza_user");
                    navigate("/", { replace: true });
                  }}>
                  LOGOUT
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
