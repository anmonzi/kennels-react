// This code imports the main React library, and two functions that it exports.
// We will useState to hold and set the array of animals.
import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
// A context stores a certain kind of data to be used in your application. Therefore, when you create a data provider component in React, you need to create a context.
// create the context to be used by other components that need data
export const AnimalContext = createContext()
//Nothing is stored in the context when it's defined. At this point, it's just an empty warehouse waiting to be filled.

// Now that the required functions are imported, and an empty context is created, it's time to define the data provider component that will allow other components to use the data in the context.
// This component establishes what data can be used.

/* You define a single property for each provider defined in your system. This is because the components that uses the data must be defined as children components (more about this in the next chapter), and React will send an object to each component. One of the properties on that object will be children, which contains the child elements. */ 
export const AnimalProvider = (props) => {
    // Next, you will use the useState() hook to define a variable that holds the state of the component, and a function that updates it.
    const [searchTerms, setSearchTerms] = useState("")
    const [animals, setAnimals] = useState([])
    // Here's what the State hook is doing for you with a single line of code.
    /*  Define the variable which will hold the data.
    let animals = []

    Define the function to be used to modify that state.
    const setAnimals = animalsData => {
        if (animalsData !== null && Array.isArray(animalsData)) {
            animals = animalsData
        }
    }*/


    // Just like in your vanilla provider, you need some functions that perform state transitions in your database, and then ensure that the application state stays in sync.
    const getAnimals = () => {
        return fetch("http://localhost:8088/animals?_expand=location&_expand=customer&_sort=location.id")
        .then(res => res.json())
        .then((data) => setAnimals(data))
    }

    const getAnimalById = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`)
        .then(res => res.json())
    }


    const addAnimal = animalObj => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
        .then(getAnimals)
    }

    const updateAnimal = animal => {
        return fetch(`http://localhost:8088/animals/${animal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
        .then(getAnimals)
    }


    const releaseAnimal = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
        .then(getAnimals)
    }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */

    /*
        Now you define what this component will expose to other components. All you need to worry about understanding in this block of code are the variables in the value attribute.

        With the following code, other components can access the array of objects being stored in the animals variable, and they can invoke the, getAnimal and addAnimal functions. You will see the syntax for using these in an upcoming chapter.
     */
    return (
        <AnimalContext.Provider value={
            {
                animals, getAnimals, addAnimal, 
                releaseAnimal, getAnimalById, updateAnimal,
                searchTerms, setSearchTerms
            }
        }>
            {props.children}
        </AnimalContext.Provider>
    )
    // You pick and choose what you want other modules to access within "value"
}