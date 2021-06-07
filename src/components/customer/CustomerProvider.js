import React, { useState, createContext } from "react"

export const CustomerContext = createContext()


export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])

    const getCustomers = () => {
        return fetch("https://nashville-kennels-48-api.herokuapp.com/customers?_embed=animals")
        .then(res => res.json())
        .then((data) => setCustomers(data))
    }

    const addCustomer = customerObj => {
        return fetch("https://nashville-kennels-48-api.herokuapp.com/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
        .then(getCustomers)
        
    }


    const removeCustomer = customerId => {
        return fetch(`https://nashville-kennels-48-api.herokuapp.com/customers/${customerId}`, {
            method: "DELETE"
        })
        .then(getCustomers)
    }
    

    return (
        <CustomerContext.Provider value= {
            {
                customers, getCustomers, addCustomer, removeCustomer
            }
        }>
            {props.children}
        </CustomerContext.Provider>
    )
}