import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "./CustomerProvider"
import "./Customer.css"
import { useHistory } from "react-router-dom"



export const CustomerForm = () => {
    const { addCustomer } = useContext(CustomerContext)
    const { animals, getAnimals } = useContext(AnimalContext)
    const history = useHistory()

    const [ customer, setCustomer] = useState ({
        name: "",
        address: "",
        email: "",
        animalId: 0
    })

    useEffect(() => {
        getAnimals()
    })


    const handleInputChange = (event) => {
        const newCustomer = {...customer}
        newCustomer[event.target.id] = event.target.value
        setCustomer(newCustomer)
    }

    const handleClickSaveCustomer = (event) => {
        event.preventDefault()

        const animalId = parseInt(customer.animalId)
        const customerName = customer.name
        const customerEmail = customer.email
        const customerAddress = customer.address

        if (animalId === 0 || customerName === "" || customerEmail === "" || customerAddress === "") {
            window.alert("Please fill in all blank fields")
        } else {
            const newCustomer = {
                name: customer.name,
                address: customer.address,
                email: customer.email,
                animalId: animalId
            }
            addCustomer(newCustomer)
                .then(() => history.push("/customers"))
        }
    }

    return (
        <form className="customerForm">
        <h2 className="customerForm__title">New Customer</h2>
        <fieldset>
            <div className="form-group">
            <label htmlFor="name">Customer name:</label>
            <input type="text" id="name" required autoFocus className="form-control" placeholder="Customer name" value={customer.name} onChange={handleInputChange} />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
            <label htmlFor="name">Customer address:</label>
            <input type="text" id="name" required autoFocus className="form-control" placeholder="Customer address" value={customer.address} onChange={handleInputChange} />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
            <label htmlFor="name">Customer email:</label>
            <input type="text" id="name" required autoFocus className="form-control" placeholder="Customer email" value={customer.email} onChange={handleInputChange} />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
            <label htmlFor="animal">Assign to Pet: </label>
            <select name="animalId" id="animalId" className="form-control" value={customer.animalId} onChange={handleInputChange}>
                <option value="0">Select a pet</option>
                {animals.map(a => (
                <option key={a.id} value={a.id}>
                    {a.name}
                </option>
                ))}
            </select>
            </div>
        </fieldset>
            <button className="btn btn-primary" onClick={handleClickSaveCustomer}>
                Add New Customer
            </button>
        </form>
    )
}

