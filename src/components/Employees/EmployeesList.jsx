import { useEffect } from "react";
import { useState } from "react";
import { getAllEmployees } from "../service/EmployeeService.jsx";
getAllEmployees;
import "./Employee.css"
import { Link } from "react-router-dom";
import { Employee } from "./Employee.jsx";


export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((employeesArray) => {
      setEmployees(employeesArray);
    });
  }, []);

  return (
<div className="employees">
        {employees.map((employeeObj) => {
        return (<Link to={`/employees/${employeeObj.id}`} key={employeeObj.id}>
        <Employee employee={employeeObj}/>
    </Link>
    )

        })}
    </div>
    )
}

