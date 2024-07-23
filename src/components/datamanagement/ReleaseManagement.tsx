import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { ReleaseData } from '../../pages/DataManagementView';

interface ReleaseManagementProps {
  onComplete: () => void;
  onDataUpdate: (data: Partial<ReleaseData>) => void;
  existingData: ReleaseData;
  isNewRelease: boolean;
}

const ReleaseManagement: React.FC<ReleaseManagementProps> = ({ onComplete, onDataUpdate, existingData, isNewRelease }) => {
  const [releaseName, setReleaseName] = useState(existingData.releaseName || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDataUpdate({ releaseName });
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {isNewRelease ? 'Create New Release' : 'Update Existing Release'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Release Name"
            value={releaseName}
            onChange={(e) => setReleaseName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {isNewRelease ? 'Create Release' : 'Update Release'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ReleaseManagement;