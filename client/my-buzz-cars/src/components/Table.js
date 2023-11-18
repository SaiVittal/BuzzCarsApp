// Table.js
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const Table = (props) => {
  
  return (
    <Box margin={2} marginBottom={2}>
    <TableContainer component={Paper} style={styles.container}>
      <MuiTable>
        <TableHead>
          <TableRow>  
            <TableCell><b>Manufacturer</b></TableCell>
            <TableCell><b>Model Name</b></TableCell>
            <TableCell><b>Vehicle Type</b></TableCell>
            <TableCell><b>Model Year</b></TableCell>
            <TableCell><b>Fuel Type</b></TableCell>
            {/* Add more table headers based on your data */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(props, "tableFilter") } */}
          {props.data.map((item) => (
            <TableRow key={item.vin}>
              <TableCell>{item.manufacturername}</TableCell>
              <TableCell>{item.modelname}</TableCell> {/* Updated from 'model' to 'vehicleType' */}
              <TableCell>{item.vehicletype}</TableCell>
              <TableCell>{item.modelyear}</TableCell>
              <TableCell>{item.fueltype}</TableCell>
              {/* Add more table cells based on your data */}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
    </Box>
  );
};

const styles = {
  container: {
    marginTop: '20px',
  },
};

export default Table;
