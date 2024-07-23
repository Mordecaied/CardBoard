import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';

interface TimelineManagementProps {
  onComplete: (timeline: Record<string, { start: string; end: string }>) => void;
  onBack: () => void;
  releaseData: any;
  existingData?: Record<string, { start: string; end: string }>;
}

const TimelineManagement: React.FC<TimelineManagementProps> = ({ onComplete, onBack, releaseData, existingData }) => {
  const [timeline, setTimeline] = useState<Record<string, { start: string; end: string }>>(existingData || {});

  useEffect(() => {
    if (existingData) {
      setTimeline(existingData);
    } else if (releaseData.tasks) {
      const newTimeline: Record<string, { start: string; end: string }> = {};
      Object.keys(releaseData.tasks).forEach(category => {
        newTimeline[category] = { start: '', end: '' };
      });
      setTimeline(newTimeline);
    }
  }, [existingData, releaseData.tasks]);

  const handleInputChange = (category: string, field: 'start' | 'end', value: string) => {
    setTimeline(prevTimeline => ({
      ...prevTimeline,
      [category]: { ...prevTimeline[category], [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(timeline);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>Timeline Management</Typography>
        <Grid container spacing={3}>
          {Object.keys(timeline).map((category) => (
            <Grid item xs={12} key={category}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '10px' }}>{category}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={timeline[category]?.start || ''}
                    onChange={(e) => handleInputChange(category, 'start', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    value={timeline[category]?.end || ''}
                    onChange={(e) => handleInputChange(category, 'end', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button onClick={onBack} variant="outlined" style={{ marginRight: '10px' }}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TimelineManagement;