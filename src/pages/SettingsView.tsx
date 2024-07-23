// src/components/SettingsView.tsx
import React from 'react';
import { 
  Paper, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Grid,
  SelectChangeEvent
} from '@mui/material';
import { useSettings } from '../contexts/SettingsContext';

const SettingsView: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    updateSettings({ [name]: value });
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Theme</InputLabel>
            <Select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              label="Theme"
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Data Refresh Interval (minutes)"
            name="refreshInterval"
            type="number"
            value={settings.refreshInterval}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SettingsView;