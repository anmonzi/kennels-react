import React from "react"
import { Route } from "react-router-dom"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"
import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"
import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"
import { AnimalForm } from "./animal/AnimalForm"
import { LocationForm } from "./location/LocationForm"
import { EmployeeForm } from "./employee/EmployeeForm"
import { AnimalDetail } from "./animal/AnimalDetail"
import { EmployeeDetail } from "./employee/EmployeeDetail"
import { LocationDetail } from "./location/LocationDetail"
import { CustomerDetail } from "./customer/CustomerDetail"
import { CustomerForm } from "./customer/CustomerForm"
import { AnimalSearch } from "./animal/AnimalSearch"



export const ApplicationViews = () => {
    return (
        <>
            {/* Render the locations */}
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>

                <Route exact path="/locations/create">
                    <LocationForm />
                </Route>

                <Route exact path="/locations/detail/:locationId(\d+)">
                    <LocationDetail />
                </Route>

                <Route exact path="/locations/edit/:locationId(\d+)">
                    <LocationForm />
                </Route>
            </LocationProvider>


            {/* Render the animals */}
            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        <Route exact path="/animals">
                            <AnimalSearch />
                            <AnimalList />
                        </Route>

                        <Route exact path="/animals/create">
                            <AnimalForm />
                        </Route>

                        <Route exact path="/animals/detail/:animalId(\d+)">
                            <AnimalDetail />
                        </Route>

                        <Route exact path="/animals/edit/:animalId(\d+)">
                            <AnimalForm />
                        </Route>
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>


            {/* Render the customers */}
            <CustomerProvider>
                <AnimalProvider>
                    <Route exact path="/customers">
                        <CustomerList />
                    </Route>

                    <Route exact path="/customers/create">
                        <CustomerForm />
                    </Route>

                    <Route exact path="/customers/detail/:customerId(\d+)">
                        <CustomerDetail />
                    </Route>
                </AnimalProvider>
            </CustomerProvider>


            {/* Render the employees */}
            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees">
                        <EmployeeList />
                    </Route>

                    <Route exact path="/employees/create">
                        <EmployeeForm />
                    </Route>

                    <Route exact path="/employees/detail/:employeeId(\d+)">
                        <EmployeeDetail />
                    </Route>

                    <Route exact path="/employees/edit/:employeeId(\d+)">
                        <EmployeeForm />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>

        </>
    )
}