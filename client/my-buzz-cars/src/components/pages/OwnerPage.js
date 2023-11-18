import React from "react";
import { Typography } from "@mui/material";
import {DialogActions, Button} from "@mui/material";
const Owner = () => {
    return (
      <div>
    <DialogActions sx={{ marginY: 2 }}>
      <Button variant="contained">
        Add Vehicle
      </Button>

      <Button variant="contained">
        View Inventory
      </Button>

      <Button variant="contained">
        View Reports
      </Button>

      </DialogActions>
      </div>
    );
  };

  export default Owner;