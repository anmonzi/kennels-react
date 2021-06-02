import React, { useContext, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useHistory } from 'react-router-dom'




export const LocationForm = () => {
    const { addLocation } = useContext(LocationContext)

    const [location, setLocation] = useState({
        name: "",
        address: ""
    })

    const history = useHistory()


    const handleControlledInputChange  = (event) => {
        const newLocation = { ...location }
        newLocation[event.target.id] = event.target.value
        setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
        event.preventDefault()

        const newLocation = {
            name: location.name,
            address: location.address
        }

        addLocation(newLocation)
            .then(() => history.push("/locations"))
    }

    return (
        <form className="newlocationForm">
        <h2 className="locationForm__title">New location</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Location name:</label>
            <input type="text" id="name" required autoFocus className="form-control" placeholder="Location Name" value={location.name} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Location address:</label>
            <input type="text" id="address" required autoFocus className="form-control" placeholder="Location Address" value={location.address} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={handleClickSaveLocation}>
          Save location
        </button>
        </form>
    )
}
