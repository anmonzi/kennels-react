import React, { useContext, useEffect, useState } from "react"
import { CustomerContext } from "./CustomerProvider"
import "./Customer.css"
import { useParams, useHistory } from 'react-router-dom'



export const CustomerDetail = () => {
    const { customers, removeCustomer } = useContext(CustomerContext)
    const [ customer, setCustomer ] = useState({ animal: {}})
    const history = useHistory()
    const { customerId } = useParams()


    useEffect(() => {
        const thisCustomer = customers.find(customer => customer.id === parseInt(customerId)) || { animal: {} }
        setCustomer(thisCustomer)
    }, [customerId])


    const handleRemove = () => {
        removeCustomer(customer.id)
            .then(() => {
                history.push("/customers")
            })
    }


    return (
        <section className="customer">
            <h3 className="customer__name">{ customer.name }</h3>
            <div className="customer__address">Address: { customer.address }</div>
            <div className="customer__email">Email: { customer.email }</div>
            <h4>Pet</h4>
            <div className="customer__animal">Owner of: { customer.animal.name}</div>
            <br></br>
            <button className="btn btn-primary" onClick={handleRemove}>Remove Customer</button>
        </section>
    )

}
