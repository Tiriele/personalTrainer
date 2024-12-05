import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button'
import dayjs from "dayjs";
import { deleteTraining } from '../CustomerTrainingApi';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: ""
  });

  const [columnDefs, setColumnDefs] = useState([
    { field: "date", headerName: "Date", filter: true, sortable: true, width: 170 },
    { field: "duration", headerName: "Duration", filter: true, sortable: true, width: 170 },
    { field: "activity", headerName: "Activity", filter: true, sortable: true, width: 170 },
    { field: "customer", headerName: "Customer", filter: true, sortable: true, width: 170 },
    {
      cellRenderer: params => <Button size='small' color='error' onClick={() => handleDelete(params.data)}>Delete</Button>, width: 150
    }
  ]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(import.meta.env.VITE_API_URL_GET_TRAININGS)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
      const formattedTrainings = data.map((training) => ({
        ...training,
        date: dayjs(training.date).format("DD.MM.YYYY HH:MM"),
        customer: `${training.customer.firstname} ${training.customer.lastname}`,
      }));
      setTrainings(formattedTrainings);
    })
    .catch(error => console.error("Error fetching data:", error));
};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addExercise = () => {
    setTrainings([...trainings, formData]);
    setFormData({
      date: "",
      duration: "",
      activity: "",
      customer: ""
    });
  };

  const handleDelete = (params) => {
      deleteTraining(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${params.id}`)
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
        minHeight: "100vh",
      }}
    >
      <div>
        <input
          placeholder="Date"
          name="date"
          onChange={handleChange}
          value={formData.date}
        />
        <input
          placeholder="Duration"
          name="duration"
          type="number"
          onChange={handleChange}
          value={formData.duration}
        />
        <input
          placeholder="Activity"
          name="activity"
          onChange={handleChange}
          value={formData.activity}
        />
        <button onClick={addExercise}>Add Exercise</button>
      </div>
      <div className='ag-theme-material' style={{height: 500, width: "100%"}}>
        <AgGridReact
          rowData={trainings || []}
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

export default Traininglist;