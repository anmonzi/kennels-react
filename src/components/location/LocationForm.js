import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useHistory, useParams } from 'react-router-dom'



export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation } = useContext(LocationContext)

    // for edit, hold on to state of location in this view
    const [location, setLocation] = useState({})
    // wait for data before button is active
    const [isLoading, setIsLoading] = useState(true)
    const {locationId} = useParams()
    const history = useHistory()

    // when field changes, update state. This causes a re-render and updates the view
    // Controlled component
    const handleControlledInputChange  = (event) => {
        const newLocation = { ...location }
        newLocation[event.target.name] = event.target.value
        setLocation(newLocation)
    }


    const handleClickSaveLocation = () => {
        const locationName = location.name
        const locationAddress = location.address

        if (locationName === "" || locationAddress === "") {
            window.alert("Please fill in a New Location Name and Address")
        } else {
            //disable the button - no extra clicks
            setIsLoading(true)
            if (locationId) {
              // PUT - update
              updateLocation({
                id: location.id,
                name: location.name,
                address: location.address
              })
              .then(() => history.push(`/locations/detail/${location.id}`))
            } else {
              // POST - add
              addLocation({
                name: location.name,
                address: location.address
              })
              .then(() => history.push("/locations"))
            }
        }
    }

    // If locationId is in the URL, getLocationById
    useEffect(() => {
      if (locationId) {
        getLocationById(locationId)
        .then(location => {
            setLocation(location)
            setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    }, [])

    return (
        <form className="locationForm">
        <h2 className="locationForm__title">New location</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Location name:</label>
            <input type="text" id="locationName" name="name" required autoFocus className="form-control" placeholder="Location Name" defaultValue={location.name} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Location address:</label>
            <input type="text" id="locationAddress" name="address" required autoFocus className="form-control" placeholder="Location Address" value={location.address} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault()
            handleClickSaveLocation()
          }}>
          {locationId ? <>Save Location</> : <>Add Location</>}
        </button>
        </form>
    )
}
