export const Employee = ({ employee }) => {
  return (
    <div className="employee">
      <div>
        <div className="employee-info">Name: </div>
        <div>{employee.name}</div>
      </div>
      <div>
        <div className="employee-info">Email: </div>
        <div>{employee.email}</div>
      </div>
      <div>
        <div className="employee-info">Phone: </div>
        <div>{employee.phone}</div>
      </div>
      <div>
        <div className="employee-info">Address: </div>
        <div>{employee.address}</div>
      </div>
    </div>
  );
};
