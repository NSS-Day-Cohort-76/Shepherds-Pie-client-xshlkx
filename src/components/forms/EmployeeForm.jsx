import { useEffect, useState } from "react"
import "./Form.css"
import { getEmployeeByUserId, updateEmployee } from "../service/EmployeeService"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = ({ currentUser }) => {
    const [employee, setEmployee] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getEmployeeByUserId(currentUser.id).then((data) => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
        })
    }, [currentUser])

    const handleSave = (event) => {
        event.preventDefault()
        console.log("clicked!")

        const editedEmployee = {
            id: employee.id,
            name: employee.name,
            email: employee.id,
            phone: employee.phone,
            address: employee.address
        }
        updateEmployee(editedEmployee).then(() => {
            navigate(`/employees/${currentUser.id}`)
        })
    
    }

    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" 
                    value={employee.name ? employee.name : ""} 
                    onChange={(event) => {
                        const copy = { ...employee }
                        copy.name = event.target.value
                        setEmployee(copy)
                    }}
                    required 
                    className="form-control" />
                </div>
            </fieldset>
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" 
                    value={employee.email ? employee.email: ""} 
                    onChange={(event) => {
                        const copy = { ...employee }
                        copy.email = event.target.value
                        setEmployee(copy)
                    }}
                    required 
                    className="form-control" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Phone: </label>
                    <input type="number" 
                    value={employee.phone ? employee.phone: 0} 
                    onChange={(event) => {
                        const copy = { ...employee }
                        copy.phone = event.target.value
                        setEmployee(copy)
                    }}
                    required 
                    className="form-control" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Address: </label>
                    <input type="text" 
                    value={employee.address ? employee.address: ""} 
                    onChange={(event) => {
                        const copy = { ...employee }
                        copy.address = event.target.value
                        setEmployee(copy)
                    }}
                    required 
                    className="form-control" />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                   <button className="form-btn btn-primary" onClick={handleSave}>Save Profile</button>
                </div>
            </fieldset>
            </form>
    )
}