import { useEffect } from "react";
import { useState } from "react";
import { getAllEmployees } from "../service/EmployeeService.jsx";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((employeesArray) => {
      setEmployees(employeesArray);
    });
  }, []);

  return (
    <ul>
      <li>
        {employees.map((employee) => {
          return (
            <article key={employee.id}>
              <section>
                <div>Name</div>
                {employee.name}
              </section>
            </article>
          );
        })}
      </li>
    </ul>
  );
};
