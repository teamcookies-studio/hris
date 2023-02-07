import Admin from "../../layouts/Admin"

import ListEmployees from "../../components/admin/EmployeesMenu/ListEmployees/ListEmployees"

export default function EmployeesList(){
    return <ListEmployees />
}

EmployeesList.layout = Admin;