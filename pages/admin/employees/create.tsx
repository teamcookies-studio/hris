import Admin from "../../../layouts/Admin"

import EmployeeCreation from "../../../components/Admin/Employees/EmployeeCreation";

export default function CreateEmployee(){
    return <EmployeeCreation />
}

CreateEmployee.layout = Admin;