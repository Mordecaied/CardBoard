import React, { useState } from 'react';
import { Typography, Paper, Grid, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { ReleaseData } from '../../pages/DataManagementView';

interface SummaryProps {
  releaseData: ReleaseData;
  onEdit: () => void;
  onApprove: () => void;
}

const Summary: React.FC<SummaryProps> = ({ releaseData, onEdit, onApprove }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleApprove = () => {
    setSnackbarMessage('Release approved and saved successfully!');
    setSnackbarOpen(true);
    setTimeout(() => {
      onApprove();
    }, 1000);  // Delay to allow the snackbar to be seen
  };

  const handleEdit = () => {
    setSnackbarMessage('Editing release...');
    setSnackbarOpen(true);
    setTimeout(() => {
      onEdit();
    }, 1000);  // Delay to allow the snackbar to be seen
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>Release Summary</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Release Name: {releaseData.releaseName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Team: {releaseData.team}</Typography>
        </Grid>
        {releaseData.teamMembers && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">Team Members:</Typography>
            <ul>
              {Object.entries(releaseData.teamMembers).map(([role, members]) => (
                <li key={role}>
                  <Typography variant="body2">
                    {role}: {Array.isArray(members) ? members.join(', ') : members}
                  </Typography>
                </li>
              ))}
            </ul>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleApprove}
            style={{ marginRight: '10px' }}
          >
            Approve and Save
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          elevation={6} 
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
};

export default Summary;