import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"

export const LocationList = () => {
    const { locations, getLocations } = useContext(LocationContext)

    useEffect(() => {
        getLocations()
    }, [])

    return (
        <section className="locations">
            {
                locations.map(location => {
                    return (
                        <div className="location" id={`location--${location.id}`}>
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
        </section>
    )
}