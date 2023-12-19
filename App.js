// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/customers';



function App() {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        address: '',
        customerNumber: '',
        meterSerialNumber: '',
    });

    useEffect(() => {
        // Fetch all customers on component mount
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get(API_BASE_URL)
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    };

    const handleInputChange = (event) => {
      console.log('Input changed:', event.target.value);
        const { name, value } = event.target;
        setNewCustomer(prevCustomer => ({ ...prevCustomer, [name]: value }));
    };

    const createCustomer = () => {
        console.log('Creating customer...');
        axios.post(API_BASE_URL, newCustomer)
            .then(() => {
                setNewCustomer({
                    name: '',
                    address: '',
                    customerNumber: '',
                    meterSerialNumber: '',
                });
                fetchCustomers();
            })
            .catch(error => console.error('Error creating customer:', error));
    };

    const updateCustomer = (customerId, updatedCustomer) => {
        axios.put(`${API_BASE_URL}/${customerId}`, updatedCustomer)
            .then(() => fetchCustomers())
            .catch(error => console.error('Error updating customer:', error));
    };

    const deleteCustomer = (customerId) => {
        axios.delete(`${API_BASE_URL}/${customerId}`)
            .then(() => fetchCustomers())
            .catch(error => console.error('Error deleting customer:', error));
    };

    return (
        <div>
            <h1>TNGL Customer Management</h1>

            {/* Form to create a new customer */}
            <div>
                <h2>Create New Customer</h2>
                <form>
                    <label>Name:</label>
                    <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} />

                    <label>Address:</label>
                    <input type="text" name="address" value={newCustomer.address} onChange={handleInputChange} />

                    <label>Customer Number:</label>
                    <input type="text" name="customerNumber" value={newCustomer.customerNumber} onChange={handleInputChange} />

                    <label>Meter Serial Number:</label>
                    <input type="text" name="meterSerialNumber" value={newCustomer.meterSerialNumber} onChange={handleInputChange} />

                    <button type="button" onClick={createCustomer}>Create Customer</button>
                </form>
            </div> 

            {/* List of customers with options to update and delete */}
            <div>
                <h2>Customer List</h2>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>
                            {customer.name} - {customer.address} - {customer.customerNumber} - {customer.meterSerialNumber}
                            <button onClick={() => updateCustomer(customer.id, { name: 'UpdatedName' })}>Update</button>
                            <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}



export default App;
