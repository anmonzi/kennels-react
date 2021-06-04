import React, { useState, createContext } from "react"

export const LocationContext = createContext()


export const LocationProvider = (props) => {
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch("http://localhost:8088/locations?_embed=employees&_embed=animals")
        .then(res => res.json())
        .then((data) => setLocations(data))
    }

    const getLocationById = locationId => {
        return fetch(`http://localhost:8088/locations/${locationId}`)
        .then(res => res.json())
    }

    const addLocation = locationObj => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(getLocations)
    }

    const updateLocation = location => {
        return fetch(`http://localhost:8088/locations/${location.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
        .then(getLocations)
    }

    const removeLocation = locationId => {
        return fetch(`http://localhost:8088/locations/${locationId}`, {
            method: "DELETE"
        })
        .then(getLocations)
    }

    return (
        <LocationContext.Provider value= {
            {
                locations, getLocations, addLocation, removeLocation, getLocationById, updateLocation
            }
        }>
            {props.children}
        </LocationContext.Provider>
    )
}