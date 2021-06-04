import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom'


export const EmployeeForm = () => {
    const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    
    // for edit, hold on to state of employee in this view
    const [employee, setEmployee] = useState ({})
    // wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)

    const {employeeId} = useParams()
    const history = useHistory()

    // when field changes, update state. This causes a re-render and updates the view
    // Controlled component
    const handleInputChange = (event) => {
        const newEmployee = { ...employee }
        newEmployee[event.target.name] = event.target.value
        setEmployee(newEmployee)
    }
    

    const handleClickSaveEmployee = () => {
        const employeeName = employee.name
        
        if (parseInt(employee.locationId) === 0 || employeeName === "") {
            window.alert("Please enter a name and choose a location")
        } else {
            // disable the button - no extra clicks
            setIsLoading(true)
            if (employeeId) {
                // PUT - update
                updateEmployee({
                    id: employee.id,
                    name: employee.name,
                    locationId: parseInt(employee.locationId)
                })
                .then(() => history.push(`/employees/detail/${employee.id}`))
            } else {
                // POST - add
                addEmployee({
                    name: employee.name,
                    locationId: parseInt(employee.locationId)
                })
                .then(() => history.push("/employees"))
            }
        }
    }


    // Get locations. If employeeId is in the URL, getEmployeeById
    useEffect(() => {
        getLocations().then(() => {
            if (employeeId) {
                getEmployeeById(employeeId)
                .then(employee => {
                    setEmployee(employee)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])


    return (
        <form className="employeeForm">
        <h2 className="employeeForm__title">New Employee</h2>
        <fieldset>
            <div className="form-group">
            <label htmlFor="employeeName">Employee name:</label>
            <input type="text" id="employeeName" name="name" required autoFocus className="form-control" placeholder="Employee name" defaultValue={employee.name} onChange={handleInputChange} />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
            <label htmlFor="location">Assign to location: </label>
            <select name="locationId" id="employeeLocation" className="form-control" value={employee.locationId} onChange={handleInputChange}>
                <option value="0">Select a location</option>
                {locations.map(l => (
                <option key={l.id} value={l.id}>
                    {l.name}
                </option>
                ))}
            </select>
            </div>
        </fieldset>
        <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
                event.preventDefault()
                handleClickSaveEmployee()
            }}>
            {employeeId ? <>Save Employee</> : <>Add Employee</>}
            </button>
        </form>
    )
}

