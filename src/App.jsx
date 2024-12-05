import { useState } from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
function App() {

  return (
    <>
    <Router>
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Personal Trainer
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Customers
            </Button>
            <Button color="inherit" component={Link} to="/exercises">
              Trainings
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Customerlist />} />
          <Route path="/exercises" element={<Traininglist />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
