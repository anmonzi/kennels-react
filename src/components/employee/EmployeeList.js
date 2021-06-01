import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"

export const EmployeeList = () => {
    const { employees, getEmployees } = useContext(EmployeeContext)

    useEffect(() => {
        getEmployees()
    }, [])


    return (
        <section className="employees">
            {
                employees.map(employee => {
                    return (
                        <div className="employee" id={`employee--${employee.id}`}>
                            <div className="employee__name">
                                Name: {employee.name}
                            </div>
                            <div className="employee__location">
                                Location: {employee.location.name}
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}