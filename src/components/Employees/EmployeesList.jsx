import { useEffect } from 'react';
import { useState } from 'react';
import { getAllEmployees } from '../service/EmployeeService.jsx';
getAllEmployees;

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
            <div key={employee.id}>
              <div>{employee.name}</div>
              <div>{employee.role}</div>
            </div>
          );
        })}
      </li>
    </ul>
  );
};
