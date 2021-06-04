import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from 'react-router-dom'



export const AnimalDetail = () => {
    const { animals, releaseAnimal } = useContext(AnimalContext)
    const [ animal, setAnimal ] = useState({ location: {}, customer: {} }) //! <--- WHY the empty objects or sometimes ([])
    const history = useHistory()

    /*
        http://localhost:5000/animal/5
        Given the example URL above, this will store the value
        of 5 in the animalId variable
    */    
    // hook function useParams() allows code to read route parameter from URL
    const { animalId } = useParams()

    useEffect(() => {
        // need to parseInt the found animalId to match animal.id
        const thisAnimal = animals.find(animal => animal.id === parseInt(animalId)) || { location: {}, customer: {} }
        //! what's the need for the object of empty objects?
        //! also, why or how can we iterate over an array here?

        setAnimal(thisAnimal)
    }, [animalId])

    
    const handleRelease = () => {
        releaseAnimal(animal.id)
            .then(() => {
                history.push("/animals")
            })
    }

    return (
        <section className="animal">
            <h3 className="animal__name">{ animal.name }</h3>
            <div className="animal__breed">Breed: { animal.breed }</div>
            <div className="animal__location">Location: { animal.location.name}</div>
            <div className="animal__owner">Customer: { animal.customer.name }</div>
            <br></br>
            <button className="btn btn-primary" onClick={handleRelease}>Release Animal</button>
            <button className="btn btn-primary" onClick={() => {
                history.push(`/animals/edit/${animal.id}`)
            }}>Edit Animal</button>
        </section>
    )
}
