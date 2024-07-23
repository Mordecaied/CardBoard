import React from 'react';
import { Button, Typography, Grid, Paper } from '@mui/material';

interface ReleaseSelectionProps {
  onSelectNew: () => void;
  onSelectExisting: () => void;
}

const ReleaseSelection: React.FC<ReleaseSelectionProps> = ({ onSelectNew, onSelectExisting }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>Release Management</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            onClick={onSelectNew}
          >
            Create New Release
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button 
            fullWidth 
            variant="outlined" 
            color="primary" 
            onClick={onSelectExisting}
          >
            Update Existing Release
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReleaseSelection;