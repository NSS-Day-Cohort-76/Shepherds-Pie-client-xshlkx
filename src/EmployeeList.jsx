import { useEffect } from "react"
import { useState } from "react"
import { getAllEmployees } from "./EmployeeService"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees().then((employeesArray) => {
            setEmployees(employeesArray)
        })
    }, [])
    
    return (<ul>
        <li>
            {employees.map((employee) => {
                return (<><div>{employee.name}</div>
                        <div>{employee.role}</div>
                </>)
            })}
        </li>
    </ul>

    ) 
}