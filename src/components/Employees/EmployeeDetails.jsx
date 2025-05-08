import { useParams } from "react-router-dom";
import { getEmployeeByUserId } from "../service/EmployeeService";
import { useEffect, useState } from "react";

import "./Employee.css";

export const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const { employeeId } = useParams();

  useEffect(() => {
    getEmployeeByUserId(employeeId).then((employeeArray) => {
      setEmployee(employeeArray[0]);
    });
  }, [employeeId]);

  return (
    <section className="employee">
      <header className="employee-header">{employee?.name}</header>
      <div>
        <span className="employee-info">Email: </span>
        {employee?.email}
      </div>
      <div>
        <span className="employee-info">Phone: </span>
        {employee?.phone}
      </div>
      <div>
        <span className="employee-info">Address: </span>
        {employee?.address}
      </div>
    </section>
  );
};
