import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useParams, useHistory } from 'react-router-dom'



export const EmployeeDetail = () => {
    const { employees, removeEmployee } = useContext(EmployeeContext)
    const [ employee, setEmployee ] = useState({ location: {} })
    const { employeeId } = useParams()
    const history = useHistory()

    useEffect(() => {
        const thisEmployee = employees.find(employee => employee.id === parseInt(employeeId)) || { location: {} }

        setEmployee(thisEmployee)
    }, [employeeId])


    const handleRelease = () => {
        removeEmployee(employee.id)
            .then(() => {
                history.push("/employees")
            })
    }


    return (
        <section className="employee">
            <h3 className="employee__name">{ employee.name}</h3>
            <div className="employee__location">Works at the: {employee.location.name} location</div>
            <br></br>
            <button className="btn btn-primary" onClick={handleRelease}>Remove Employee</button>
            <button className="btn btn-primary" onClick={() => {
                history.push(`/employees/edit/${employee.id}`)
            }}>Edit Employee</button>
        </section>
    )
}