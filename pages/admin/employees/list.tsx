import Admin from "../../../layouts/Admin"

import ListEmployees from "../../../components/Admin/Employees"

export default function EmployeesList(){
    return <ListEmployees />
}

EmployeesList.layout = Admin;