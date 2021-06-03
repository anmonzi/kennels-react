import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams } from 'react-router-dom'


export const LocationDetail = () => {
    const { locations } = useContext(LocationContext)
    const [ location, setLocation ] = useState({ employees: [], animals: [] })
    const { locationId } = useParams()

    useEffect(() => {
        const thisLocation = locations.find(location => location.id === parseInt(locationId)) || { employees: [], animals: [] }

        setLocation(thisLocation)
    }, [locationId])

    return (
        <section className="location">
            <h3 className="location__name">{ location.name }</h3>
            <address className="location__address">{ location.address }</address>
            <h4>Employees</h4>
            <div className="location__employees">
                Employees who work here:
                {location.employees.map(employee =>
                    <div className="location__employee__name"> { employee.name } </div>
                )}
            </div>
            <h4>Current Animals</h4>
            <div className="location__animals">
                Animals staying here:
                {location.animals.map(animal =>
                    <div className="location__animal__name"> { animal.name } </div>
                )}
            </div>
        </section>
    )
}

