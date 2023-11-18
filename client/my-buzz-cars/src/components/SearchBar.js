// SearchBar.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [modelType, setModelType] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [modelYears, setModelYears] = useState([]);


  useEffect(() => {
    // Fetch unique vehicle types and model years from the server
    const fetchUniqueValues = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/vehicles/uniqueValues');
        const data = await response.json();

        setVehicleTypes(data.uniqueVehicleTypes);
        setModelYears(data.uniqueModelYears);
      } catch (error) {
        console.error('Error fetching unique values:', error);
      }
    };

    fetchUniqueValues();
  }, []); // Run this effect once on mount

  const handleSearch = () => {
    onSearch({ searchText, modelType, modelYear });
  };

  return (
    <Box margin={4} marginBottom={2}>
      <FormControl style={styles.formControl} variant="outlined">
        <InputLabel shrink={!!searchText} htmlFor="search-input">Search Manufacturer or Model Name</InputLabel>
        <TextField
          id="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          InputLabelProps={{ shrink: !!searchText }}
          inputProps={{ style: { borderRadius: '50%', width: '250px' } }} // Updated width and border-radius
        />
      </FormControl>
      <FormControl style={styles.formControl} variant="outlined">
        <InputLabel shrink={!!modelType} htmlFor="color-input">Vehicle Type</InputLabel>
        <Select
          id="color-input"
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
          variant="outlined"
          inputProps={{ style: { borderRadius: '50%' } }} // Updated border-radius
        >
          <MenuItem value="">Any</MenuItem>
          {vehicleTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
          {/* Add more color options */}
        </Select>
      </FormControl>
      <FormControl style={styles.formControl} variant="outlined">
        <InputLabel shrink={!!modelYear} htmlFor="year-input">Model Year</InputLabel>
        <Select
          id="year-input"
          value={modelYear}
          onChange={(e) => setModelYear(e.target.value)}
          variant="outlined"
          inputProps={{ style: { borderRadius: '50%' } }} // Updated border-radius
        >
          <MenuItem value="">Any</MenuItem>
          {modelYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
          {/* Add more year options */}
        </Select>
      </FormControl>
      <Button variant="contained" style={styles.button} onClick={handleSearch}>
        Search
      </Button>
      </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  formControl: {
    minWidth: '200px',
    margin: '5px',
  },
  button: {
    margin: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '15px', // Curves the edges
  },
};

export default SearchBar;
