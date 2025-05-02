

export const getAllEmployees = () => {
    return fetch("http://localhost:8088/employees").then((res) => res.json())
}

export const getEmployeeByUserId = (id) => {
    return fetch(
        `http://localhost:8088/employees?id=${id}`
    ).then((res) => res.json())
}

export const updateEmployee = (employee) => {
    return fetch(`http://localhost:8088/employees/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    })
}