import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams } from 'react-router-dom'



export const AnimalDetail = () => {
    const { animals } = useContext(AnimalContext)
    const [ animal, setAnimal ] = useState({ location: {}, customer: {} })

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
        //? what's the need for the object of empty objects?

        setAnimal(thisAnimal)
    }, [animalId])

    return (
        <section className="animal">
            <h3 className="animal__name">{ animal.name }</h3>
            <div className="animal__breed">Breed: { animal.breed }</div>
            <div className="animal__location">Location: { animal.location.name}</div>
            <div className="animal__owner">Customer: { animal.customer.name }</div>
        </section>
    )
}
