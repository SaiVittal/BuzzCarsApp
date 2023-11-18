// InventoryClerkPage.js
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Table from '../Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InventoryClerkPage = ({ onSearch }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false);
  const [id, setId] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState([]);


  useEffect(()=>{
    axios.get('http://localhost:3001/api/vehicles').then(res=>setVehicleData(res.data)).catch(err=>console.log(err))
  }, [])

  const handleAddVehicle = () => {
    // Open the dialog for adding a new vehicle
    setIsAddVehicleDialogOpen(true);
  };

  
  const handleCancelAddVehicle = () => {
    // Close the dialog and reset the form
    setIsAddVehicleDialogOpen(false);
    setId('');
    setMake('');
    setModel('');
    setYear('');

  };

  useEffect(() => {
    // Fetch initial data from the server
    handleSearch({ searchText: '', color: '', modelYear: '' });
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleSearch = async (filters) => {
    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:3001/api/vehicles/');
      const data = await response.json();

      // Apply filtering based on the received data
      const filtered = data.filter((item) => {
        const searchTextMatch =
          item.make.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          item.model.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          item.id.toLowerCase().includes(filters.searchText.toLowerCase());

        const colorMatch = filters.color === '' || item.color.toLowerCase() === filters.color.toLowerCase();
        const modelYearMatch = filters.modelYear === '' || item.year.toString() === filters.modelYear;
        

        return searchTextMatch && colorMatch && modelYearMatch;
      });

      setFilteredData(filtered);
    } catch (error) {
      console.error('Error fetching or filtering data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data from the server
    handleSearch({ searchText: '', color: '', modelYear: ''});
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Perform the API request to add the new vehicle to the database
      const response = await axios.post('/api/vehicles', {
        id,
        make,
        model,
        year,
        color
      });

      console.log('New vehicle added:', response.data);

      // Close the dialog and reset the form
      setIsAddVehicleDialogOpen(false);
      setId('');
      setMake('');
      setModel('');
      setYear('');


      // Fetch updated data from the server
      handleSearch({ searchText: '', color: '', modelYear: '' });
    } catch (error) {
      console.error('Error adding new vehicle:', error);
    }
  };

  return (
    <div>

    <DialogActions sx={{ marginY: 2 }}>
      <Button variant="contained" onClick={() => setIsAddVehicleDialogOpen(true)}>
        Add Vehicle
      </Button>

      <Button variant="contained" onClick={() => setIsAddVehicleDialogOpen(true)}>
        View Inventory
      </Button>

      <Button variant="contained" onClick={() => setIsAddVehicleDialogOpen(true)}>
        Add/Edit Parts
      </Button>

      </DialogActions>


      <SearchBar onSearch={handleSearch} includeVinSearch />
      <Table data={filteredData} />

      <Dialog open={isAddVehicleDialogOpen} onClose={handleCancelAddVehicle}>
        <DialogTitle>Add New Vehicle</DialogTitle>
        <DialogContent>
          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <TextField label="ID" value={id} onChange={(e) => setId(e.target.value)} fullWidth margin="normal" />
            <TextField label="Make" value={make} onChange={(e) => setMake(e.target.value)} fullWidth margin="normal" />
            <TextField label="Model" value={model} onChange={(e) => setModel(e.target.value)} fullWidth margin="normal" />
            <TextField label="Year" value={year} onChange={(e) => setYear(e.target.value)} fullWidth margin="normal" />

          </form>
        </DialogContent>
        <DialogActions>
          {/* Add and Cancel Buttons */}
          <Button onClick={handleCancelAddVehicle}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InventoryClerkPage;
