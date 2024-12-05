import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button'
import { deleteCustomer } from '../CustomerTrainingApi';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function Customerlist() {
    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    });

    const [columnDefs, setColumnDefs] = useState([
        { field: 'firstname', headerName: 'First Name', filter: true, sortable: true, width: 170 },
        { field: 'lastname', headerName: 'Last name', filter: true, sortable: true, width: 170 },
        { field: 'streetaddress', headerName: 'Street Address', filter: true, sortable: true, width: 180 },
        { field: 'postcode', headerName: 'Postal Code', filter: true, sortable: true, width: 170 },
        { field: 'city', headerName: 'City', filter: true, sortable: true, width: 170 },
        { field: 'email', headerName: 'Email', filter: true, sortable: true, width: 180 },
        { field: 'phone', headerName: 'Phone', filter: true, sortable: true, width: 170 },
        {
          cellRenderer: params => <Button size='small' color='error' onClick={() => handleDelete(params.data)}>Delete</Button>, width: 150
        }
      ]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch(import.meta.env.VITE_API_URL_CUSTOMERS)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setCustomers(data._embedded.customers))
        .catch(error => console.error("Error fetching data:", error));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
      };

    const addCustomer = () => {
        setCustomers([...customers, formData]);
        setFormData({
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: "",
        });
      };

      const handleDelete = (params) => {
        deleteCustomer(params._links.self.href)
          .then(() => fetchData())
          .catch(error => console.error(error))
    }

    return (
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh"
        }}
      >
        <div>
          <input
            placeholder="First name"
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            placeholder="Last name"
            name="lastname"
            onChange={handleChange}
            value={formData.lastname}
          />
          <input
            placeholder="Street Address"
            name="streetaddress"
            onChange={handleChange}
            value={formData.streetaddress}
          />
          <input
            placeholder="Postal Code"
            name="postcode"
            onChange={handleChange}
            value={formData.postcode}
          />
          <input
            placeholder="City"
            name="city"
            onChange={handleChange}
            value={formData.city}
          />
          <input
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
          />
          <button onClick={addCustomer}>Add</button>
        </div>
        <div
          className="ag-theme-material"
          style={{
            width: "100%",
            maxWidth: "1400px",
            height: "500px",
            margin: "20px auto",
          }}
        >
          <AgGridReact
            rowData={customers || []}
            columnDefs={columnDefs}
            rowSelection="single"
            pagination={true}
            paginationAutoPageSize={true}
            suppressCellFocus={true}
          />
        </div>
      </div>
    );
}

export default Customerlist;