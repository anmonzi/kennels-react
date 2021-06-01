import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./Kennel.css"

// import { AnimalProvider } from "./animal/AnimalProvider"
// import { AnimalList } from "./animal/AnimalList"
// import { EmployeeProvider } from "./employee/EmployeeProvider"
// import { EmployeeList } from "./employee/EmployeeList"
// import { LocationProvider } from "./location/LocationProvider"
// import { LocationList } from "./location/LocationList"
// import { CustomerProvider } from "./customer/CustomerProvider"
// import { CustomerList } from "./customer/CustomerList"





export const Kennel = () => (
    <>
        <NavBar />
        <ApplicationViews />
    </>
)






// This is also called a component
/*
    Note that the <AnimalList> component is a child of the <AnimalProvider> component. It is crucial that you wrap components that need data with the provider component that exposes that data in JSX. You can wrap a component in as many providers as needed.
*/

// export const Kennel = () => (
//     <>
//         <h2>Nashville Kennels</h2>
//         <small>Loving care when you're not there.</small>

//         <address>
//             <div>Visit Us at the Nashville North Location</div>
//             <div>500 Puppy Way</div>
//         </address>

//         <h2>Animals</h2>
//         <article className="animals">
//         <AnimalProvider>
//             <AnimalList />
//         </AnimalProvider>
//         </article>

//         <h2>Employees</h2>
//         <article className="employees">
//         <EmployeeProvider>
//             <EmployeeList />
//         </EmployeeProvider>
//         </article>

//         <h2>Locations</h2>
//         <article className="locations">
//         <LocationProvider>
//             <LocationList />
//         </LocationProvider>
//         </article>

//         <h2>Customers</h2>
//         <article className="customers">
//         <CustomerProvider>
//             <CustomerList />
//         </CustomerProvider>
//         </article>
//     </>
// )