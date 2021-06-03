import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { useHistory, Link } from 'react-router-dom'
import "./Employee.css"

export const EmployeeList = () => {
    const { employees, getEmployees } = useContext(EmployeeContext)
    const history = useHistory()

    useEffect(() => {
        getEmployees()
    }, [])


    return (
        <>
            <h1>Current Employees</h1>

            <button onClick={() => history.push("/employees/create")}>
                Add Employee
            </button>

            <div className="employees">
                {
                    employees.map(employee => 
                        <div className="employee" key={employee.id} id={`employee--${employee.id}`}>
                            <div className="employee__name">
                                <Link to={`/employees/detail/${employee.id}`}>
                                    { employee.name }
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
