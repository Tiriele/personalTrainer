import './App.css';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function App() {

  return (
    <Container maxWidth="xl">
    <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: '#40A056' }}>
        <Toolbar className="toolbar"
        sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Personal Trainer</Typography>
          <Box component="nav" sx={{ display: 'flex', gap: 2 }}>
            <Link to={"/"} style={{ color: "white", textDecoration: "none" }} className="nav-links">Customers</Link>
            <Link to={"/exercises"} style={{ color: "white", textDecoration: "none" }} className="nav-links">Trainings</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 8 }} />
      <Outlet />
  </Container>
  )
}

export default App
