import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { AnimalDetail } from "./AnimalDetail"
import { useHistory, Link } from 'react-router-dom'
import "./Animal.css"

//Since the animal list needs to react when the user types something into the search field, two things must happen:
//Get the searchTerms state from the provider.
//Implement a useEffect() hook that will filter the animals to the ones that match what the user typed in.


export const AnimalList = () => {
    const { animals, getAnimals, searchTerms } = useContext(AnimalContext)
    const history = useHistory()

    // Since you are no longer ALWAYS displaying all of the animals
    const [ filteredAnimals, setFiltered ] = useState([])
    
    // invocation of react's useEffect() hook, which grabs data that cannot be handled at init render
    // empty array at end is dependency array; it prevents infinite loop by setting the function depedent on iterating on empty array
    // Initialization of effect hook -> Go get animal data
    useEffect(() => {
        getAnimals()
    }, [])


    // useEffect dependency array WITH dependencies - will run if dependency changes (state)
    // searchTerms will cause a change
    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching animals
            const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display ALL animals
            setFiltered(animals)
        }
    }, [searchTerms, animals])



    return (
        <>
            <h1>Current Animals</h1>

            <button onClick={() => history.push("/animals/create")}>
                Make Reservation
            </button>

            <div className="animals">
                {
                    filteredAnimals.map(animal => {
                        return <AnimalDetail animalObject={animal} key={animal.id} />
                    })
                }
            </div>
        </>
    )
}




//* OLD RETURNED ANIMAL LIST WITHOUT FILTER FUNCTION
// return (
//     <>
//         <h1>Current Animals</h1>

//         <button onClick={() => history.push("/animals/create")}>
//             Make Reservation
//         </button>

//         <div className="animals">
//             {
//                 animals.map(animal => 
//                     <div className="animal" key={animal.id} id={`animal--${animal.id}`}>
//                         <div className="animal__name">
//                             <Link to={`/animals/detail/${animal.id}`}>
//                                 { animal.name }
//                             </Link>
//                         </div>
//                         <div className="animal__breed">
//                             Breed: { animal.breed }
//                         </div>
//                     </div>
//                 )
//             }
//         </div>
//     </>
// )












// OLD ANIMAL LIST COMPONENET
// export const AnimalList = () => {
//     // This state changes when `getAnimals()` is invoked below
//     // The useContext hook allows you to use data structures and functions that a parent provider component exposes.
//     // To start, you need to import the context object you created in the provider component so that the Context hook can access the objects it exposes.
//     const { animals, getAnimals } = useContext(AnimalContext)
//     const history = useHistory()

//     // The useEffect hook allows the component to reach out into the world for anything that cannot be handled during render. In this case, it is the API call for the animals.
//     // If state changes, run these instructions
//     useEffect(() => {
//         getAnimals()
//     }, []) // Array is empty so component only render once

//     /*The dependency array. Logic within functions only occur when a function is invoked. Within a React component, useEffect is a function. After the return, useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders.

//     You can include dependencies in the array to cause the useEffect to run additional times.

//     Be careful setting state within the useEffect. State changes cause a re-render. Re-render can invoke useEffect (depending on the dependency array values). This would result in an infinate loop.
//     */

//     return (
//         <section>
//             <h2>Animals</h2>
//             <button onClick={
//                 () => history.push("/animals/create")
//             }>
//                 Add Animal
//             </button>
//             <div className="animals">
//             {
//                 // Use the .map() array method to iterate the array of animals and generate HTML for each one.
//                 animals.map(animal => {
//                     return (
//                         <div className="animal" key={animal.id} id={`animal--${animal.id}`}>
//                             <div className="animal__name">
//                                 Name: { animal.name }
//                             </div>
//                             <div className="animal__breed">
//                                 Breed: { animal.breed }
//                             </div>
//                             <div className="animal__location">
//                                 Location: { animal.location.name}
//                             </div>
//                             <div className="animal__parent">
//                                 Parent Name: { animal.customer.name}
//                             </div>
//                         </div>
//                     )
//                 })
//             }
//             </div>
//         </section>
//     )
// }
