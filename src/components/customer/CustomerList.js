import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { Link, useHistory } from 'react-router-dom'
import "./Customer.css"

export const CustomerList = () => {
    const { customers, getCustomers } = useContext(CustomerContext)
    const history = useHistory()

    useEffect(() => {
        getCustomers()
    }, [])

    return (
        <>
            <h1>Current Customers</h1>

            <button onClick={() => history.push("/customers/create")}>
                Add Customer
            </button>

            <div className="customers">
                {
                    customers.map(customer => 
                        <div className="customer" key={customer.id} id={`customer--${customer.id}`}>
                            <div className="customer__name">
                                <Link to={`/customers/detail/${customer.id}`}>
                                    { customer.name }
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

