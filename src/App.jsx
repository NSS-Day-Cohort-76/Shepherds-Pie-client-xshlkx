import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Views/Authorized.jsx";
import { ApplicationViews } from "./Views/ApplicationViews.jsx";
import { Login } from "./components/auth/Login.jsx";
import "./App.css";
import { Register } from "./components/auth/Register.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
};
