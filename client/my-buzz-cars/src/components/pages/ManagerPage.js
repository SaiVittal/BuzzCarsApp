import React from "react";
import { Button, Typography } from "@mui/material";
import {DialogActions} from "@mui/material";
const Manager = () => {
    return (
      <div>
    <DialogActions sx={{ marginY: 2 }}>


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

  export default Manager;