import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { useHistory } from 'react-router-dom'
import "./Animal.css"




export const AnimalList = () => {
    // This state changes when `getAnimals()` is invoked below
    // The useContext hook allows you to use data structures and functions that a parent provider component exposes.
    // To start, you need to import the context object you created in the provider component so that the Context hook can access the objects it exposes.
    const { animals, getAnimals } = useContext(AnimalContext)
    const history = useHistory()

    // The useEffect hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the animals.
    // If state changes, run these instructions
    useEffect(() => {
        getAnimals()
    }, []) // Array is empty so component only render once

    /*The dependency array. Logic within functions only occur when a function is invoked. Within a React component, useEffect is a function. After the return, useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders.

    You can include dependencies in the array to cause the useEffect to run additional times.

    Be careful setting state within the useEffect. State changes cause a re-render. Re-render can invoke useEffect (depending on the dependency array values). This would result in an infinate loop.
    */

    return (
        <section>
            <h2>Animals</h2>
            <button onClick={
                () => history.push("/animals/create")
            }>
                Add Animal
            </button>
            <div className="animals">
            {
                // Use the .map() array method to iterate the array of animals and generate HTML for each one.
                animals.map(animal => {
                    return (
                        <div className="animal" key={animal.id} id={`animal--${animal.id}`}>
                            <div className="animal__name">
                                Name: { animal.name }
                            </div>
                            <div className="animal__breed">
                                Breed: { animal.breed }
                            </div>
                            <div className="animal__location">
                                Location: { animal.location.name}
                            </div>
                            <div className="animal__parent">
                                Parent Name: { animal.customer.name}
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}
