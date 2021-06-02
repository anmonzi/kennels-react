import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { useHistory } from 'react-router-dom'
import "./Location.css"

export const LocationList = () => {
    const { locations, getLocations } = useContext(LocationContext)
    const history = useHistory()

    useEffect(() => {
        getLocations()
    }, [])

    return (
        <section>
            <h2>Locations</h2>
            <button onClick={
                () => history.push("/locations/create")
            }>
                Add Location
            </button>
            <div className="locations">
            {
                locations.map(location => {
                    return (
                        <div className="location" key={location.id} id={`location--${location.id}`}>
                            <div className="location__name">
                                Name: {location.name}
                            </div>
                            <div className="location__address">
                                Address: {location.address}
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}