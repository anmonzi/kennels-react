import React, { useState, createContext } from "react"

export const CustomerContext = createContext()


export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])

    const getCustomers = () => {
        return fetch("http://localhost:8088/customers?_embed=animals")
        .then(res => res.json())
        .then((data) => setCustomers(data))
    }

    const addCustomer = customerObj => {
        return fetch("http://localhost:8088/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
        .then(getCustomers)
        
    }


    const removeCustomer = customerId => {
        return fetch(`http://localhost:8088/customers/${customerId}`, {
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